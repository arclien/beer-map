import React, { useContext, useRef, useState, useEffect } from 'react';
import qs from 'qs';
import { useLocation } from 'react-router';

import { isEmptyObject } from 'utils/utils';
import { hasCheckedInById, setCheckedIn } from 'utils/CheckedIn.utils';
import useKakaoMap from 'hooks/useKakaoMap';
import useGoogleSheet from 'hooks/useGoogleSheet';
import PlaceInfo from './PlaceInfo/PlaceInfo';
import PlaceInfoNew from './PlaceInfoNew/PlaceInfoNew';
import MapOption from './MapOption/MapOption';
import MapFilter from './MapFilter/MapFilter';
import SearchPlace from './SearchPlace/SearchPlace';
import { ConfirmModalContext } from 'context/ConfirmModalContext';

import { KakaoMap, SpinnerContainer, SpinnerComponent } from './MapView.styles';

const MapView = () => {
  const container = useRef();

  const [markerData, setMarkerData] = useState([]);
  const [checkInPlaceId, setCheckInPlaecId] = useState();
  // 검색 여부
  const [isAbleToSearch, setAbleToSearch] = useState(false);
  const { getGoogleSheetMapData } = useGoogleSheet();

  const {
    state: { isOpenConfirmModal },
    actions: { openOkConfirmModal, closeConfirmModal },
  } = useContext(ConfirmModalContext);

  const { search } = useLocation();

  const {
    kakaoMap,
    currentPlaceInfo,
    setCurrentPlaceInfo,
    isVisiblePlaceInfo,
    myGeoLocation,
    getGeoLocation,
  } = useKakaoMap(container, markerData);

  // 맵에 마커 등록
  useEffect(() => {
    (async () => {
      const mapData = await getGoogleSheetMapData();
      setMarkerData(mapData);
    })();
  }, [getGoogleSheetMapData]);

  // QR로 체크인 접속시
  useEffect(() => {
    if (checkInPlaceId) return;

    const { id } = qs.parse(search, {
      ignoreQueryPrefix: true,
    });

    const _currentPlaceInfo = markerData?.find(
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

  return (
    <>
      <KakaoMap id="container" ref={container} />
      <MapFilter setMarkerData={setMarkerData} />
      <MapOption
        map={kakaoMap}
        myGeoLocation={myGeoLocation}
        getGeoLocation={getGeoLocation}
        setAbleToSearch={setAbleToSearch}
        setMarkerData={setMarkerData}
      />
      <SearchPlace
        setMarkerData={setMarkerData}
        kakaoMap={kakaoMap}
        isAbleToSearch={isAbleToSearch}
        setAbleToSearch={setAbleToSearch}
      />

      {(isVisiblePlaceInfo || checkInPlaceId) &&
        !isEmptyObject(currentPlaceInfo) &&
        !currentPlaceInfo?.isNewPlace && (
          <PlaceInfo currentPlaceInfo={currentPlaceInfo} />
        )}

      {isVisiblePlaceInfo && currentPlaceInfo?.isNewPlace && (
        <PlaceInfoNew currentPlaceInfo={currentPlaceInfo} />
      )}

      {!kakaoMap&&(
        <SpinnerContainer>
          <SpinnerComponent />
        </SpinnerContainer>
      )}
    </>
  );
};

export default MapView;
