import React, { useContext, useRef, useState, useEffect } from 'react';
import qs from 'qs';
import { useLocation } from 'react-router';

import useDebounce from 'hooks/useDebounce';
import { isEmptyObject } from 'utils/utils';
import { hasCheckedInById, setCheckedIn } from 'utils/CheckedIn.utils';
import useKakaoMap from 'hooks/useKakaoMap';
import useGoogleSheet from 'hooks/useGoogleSheet';
import PlaceInfo from './PlaceInfo/PlaceInfo';
import PlaceInfoNew from './PlaceInfoNew/PlaceInfoNew';
import MapOption from './MapOption/MapOption';
import SearchPlace from './SearchPlace/SearchPlace';
import { ConfirmModalContext } from 'context/ConfirmModalContext';
import { errorToast } from 'utils/toast';

import { KakaoMap, SpinnerContainer, SpinnerComponent } from './MapView.styles';

const MapView = () => {
  const container = useRef();

  const [markerData, setMarkerData] = useState([]);
  const [checkInPlaceId, setCheckInPlaecId] = useState();
  const [keywordSearch, setKeywordSearch] = useState('');
  const debounceSearchKeyword = useDebounce(keywordSearch, 500);

  // 검색 여부
  const [isAbleToSearch, setAbleToSearch] = useState(false);

  const {
    kakaoMap,
    currentPlaceInfo,
    setCurrentPlaceInfo,
    isVisiblePlaceInfo,
    myGeoLocation,
    getGeoLocation,
  } = useKakaoMap(container, markerData);

  const { sheetMapData } = useGoogleSheet();

  const {
    state: { isOpenConfirmModal },
    actions: { openOkConfirmModal, closeConfirmModal },
  } = useContext(ConfirmModalContext);

  const { search } = useLocation();

  // 장소 등록
  useEffect(() => {
    (async () => {
      if (!kakaoMap) return;

      setMarkerData(sheetMapData);
    })();
  }, [kakaoMap, sheetMapData]);

  // 검색 취소시 초기화
  useEffect(() => {
    if (!isAbleToSearch) {
      setKeywordSearch('');
      setMarkerData([]);
    }
  }, [isAbleToSearch]);

  // QR로 체크인 접속시
  useEffect(() => {
    if (checkInPlaceId) return;

    const { id } = qs.parse(search, {
      ignoreQueryPrefix: true,
    });

    const _currentPlaceInfo = markerData.find(
      (el) => el.kakaoId === parseInt(id, 10)
    );

    if (_currentPlaceInfo) {
      setCheckInPlaecId(id);
      setCurrentPlaceInfo(_currentPlaceInfo);

      const { name, kakaoId } = _currentPlaceInfo;

      const hasCheckedIn = hasCheckedInById(kakaoId);

      if (!isOpenConfirmModal) {
        openOkConfirmModal(
          () => {
            if (hasCheckedIn) return;
            setCheckedIn(kakaoId);
          },
          `${name}`,
          hasCheckedIn ? '이미 체크인 하셨습니다.' : '체크인 하시겠습니까?',
          'ok',
          'success',
          () => {
            closeConfirmModal();
          }
        );
      }
    }
  }, [
    search,
    markerData,
    checkInPlaceId,
    closeConfirmModal,
    isOpenConfirmModal,
    openOkConfirmModal,
    setCurrentPlaceInfo,
  ]);

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
  }, [kakaoMap, debounceSearchKeyword]);

  return (
    <>
      <KakaoMap id="container" ref={container} />
      <MapOption
        map={kakaoMap}
        myGeoLocation={myGeoLocation}
        getGeoLocation={getGeoLocation}
        setAbleToSearch={setAbleToSearch}
        setMarkerData={setMarkerData}
      />
      <SearchPlace
        isAbleToSearch={isAbleToSearch}
        keywordSearch={keywordSearch}
        setAbleToSearch={setAbleToSearch}
        currentPlaceInfo={currentPlaceInfo}
        setKeywordSearch={setKeywordSearch}
      />
      {(isVisiblePlaceInfo || checkInPlaceId) &&
        !isEmptyObject(currentPlaceInfo) &&
        !currentPlaceInfo?.isNewPlace && (
          <PlaceInfo currentPlaceInfo={currentPlaceInfo} />
        )}

      {isVisiblePlaceInfo && currentPlaceInfo?.isNewPlace && (
        <PlaceInfoNew currentPlaceInfo={currentPlaceInfo} />
      )}

      {!kakaoMap && (
        <SpinnerContainer>
          <SpinnerComponent />
        </SpinnerContainer>
      )}
    </>
  );
};

export default MapView;
