import React, { useCallback } from 'react';
import {
  faSearchPlus,
  faSearchMinus,
  faSearchLocation,
  faLocationArrow,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useGoogleSheet from 'hooks/useGoogleSheet';

import { Container, Icons } from './MapOption.styles';

const MapOption = ({
  map,
  myGeoLocation,
  getGeoLocation,
  setAbleToSearch,
  setMarkerData,
}) => {
  const { sheetMapData } = useGoogleSheet();

  // 현재 위치로 맵 이동
  const relocateCurrentPosition = () => {
    setAbleToSearch(false);
    getGeoLocation();
    setMarkerData(sheetMapData);
    const { lat, lng } = myGeoLocation;
    const moveLatLon = new window.kakao.maps.LatLng(lat, lng);
    map.panTo(moveLatLon);
  };

  // 현재 지도 중심으로 다시 검색
  const reloadMarkerOnCurrentPosition = async () => {
    setAbleToSearch(false);
    setMarkerData(sheetMapData);
  };

  // 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
  const zoomIn = useCallback(() => {
    map.setLevel(map.getLevel() - 1);
  }, [map]);

  // 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
  const zoomOut = useCallback(() => {
    map.setLevel(map.getLevel() + 1);
  }, [map]);

  return (
    <Container>
      <Icons>
        <Icons.ZoomIn onClick={zoomIn}>
          <FontAwesomeIcon icon={faSearchPlus} />
        </Icons.ZoomIn>

        <Icons.Relocate onClick={relocateCurrentPosition}>
          <FontAwesomeIcon icon={faLocationArrow} />
        </Icons.Relocate>

        <Icons.Reload onClick={reloadMarkerOnCurrentPosition}>
          <FontAwesomeIcon icon={faSearchLocation} />
        </Icons.Reload>

        <Icons.ZoomOut onClick={zoomOut}>
          <FontAwesomeIcon icon={faSearchMinus} />
        </Icons.ZoomOut>
      </Icons>
    </Container>
  );
};

export default MapOption;
