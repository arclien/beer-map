import React, { useState, useEffect, useCallback } from 'react';

import MapSearch from '../MapSearch/MapSearch';
import useDebounce from 'hooks/useDebounce';
import { errorToast } from 'utils/toast';
import useGoogleSheet from 'hooks/useGoogleSheet';

import { AddButton } from './SearchPlace.styles';

const SearchPlace = ({
  isAbleToSearch,
  setAbleToSearch,
  setMarkerData,
  kakaoMap,
}) => {
  const [keywordSearch, setKeywordSearch] = useState('');
  const debounceSearchKeyword = useDebounce(keywordSearch, 500);
  const { sheetMapData } = useGoogleSheet();

  const getSimilarExistPlace = useCallback(
    (placeName) =>
      sheetMapData
        .filter(
          ({ address, name }) =>
            address.includes(placeName) || name.includes(placeName)
        )
        .map((el) => {
          return { ...el, isExistPlace: true };
        }),
    [sheetMapData]
  );

  // 검색 취소시 초기화
  useEffect(() => {
    if (!isAbleToSearch) {
      setKeywordSearch('');
      setMarkerData([]);
    }
  }, [isAbleToSearch, setMarkerData]);

  // 키워드 검색
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    if (!window?.kakao || window?.kakao?.maps === null) {
      return;
    }

    if (!debounceSearchKeyword.trim()) {
      return;
    }

    if (!debounceSearchKeyword.replace(/^\s+|\s+$/g, '')) {
      errorToast('키워드를 입력해주세요!');
      return;
    }

    const existPlace = getSimilarExistPlace(debounceSearchKeyword);
    if (existPlace.length > 0) {
      setMarkerData(existPlace);
      return;
    }

    // 장소 검색 객체를 생성합니다
    const ps = new window.kakao.maps.services.Places();
    // https://apis.map.kakao.com/web/documentation/#services_Places_keywordSearch
    const options = {};
    // 키워드로 장소를 검색합니다
    ps.keywordSearch(
      debounceSearchKeyword,
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const manipulatedData = data.map(
            // eslint-disable-next-line camelcase
            ({ place_name, y, x, address_name, id, phone }) => {
              // console.log({
              //   address: address_name,
              //   latitude: parseFloat(parseFloat(y).toFixed(5)),
              //   longitude: parseFloat(parseFloat(x).toFixed(5)),
              //   name: place_name,
              //   kakaoId: parseInt(id, 10),
              //   naverId: '',
              //   url: '',
              // });

              return {
                name: place_name,
                latitude: y,
                longitude: x,
                kakaoId: id,
                address: address_name,
                phone,
                isNewPlace: true,
              };
            }
          );
          setMarkerData(manipulatedData);
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          errorToast('검색 결과가 존재하지 않습니다.');
        } else if (status === window.kakao.maps.services.Status.ERROR) {
          errorToast('검색 결과 중 오류가 발생했습니다.');
        }
      },
      options
    );
  }, [debounceSearchKeyword, getSimilarExistPlace, kakaoMap, setMarkerData]);

  return (
    <>
      {!isAbleToSearch && (
        <AddButton onClick={() => setAbleToSearch(true)}>
          신규 장소 검색
        </AddButton>
      )}

      {isAbleToSearch && (
        <MapSearch
          keywordSearch={keywordSearch}
          setKeywordSearch={setKeywordSearch}
          setAbleToSearch={setAbleToSearch}
        />
      )}
    </>
  );
};

export default SearchPlace;
