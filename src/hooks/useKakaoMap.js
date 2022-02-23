import { useState, useEffect, useCallback } from 'react';

import { hasCheckedInById } from 'utils/CheckedIn.utils';
import useGeoLocation from 'hooks/useGeoLocation';
import {
  KAKAO_APP_KEY,
  KAKAO_SDK_URI,
  MapSize,
  MapLevel,
} from 'constants/kakaoMap';
import { getMarkerImages } from 'utils/Map.utils';
import getInfoWindow from 'utils/InfoWindow';

let selectedMarker = null;

export default function useKakaoMap(container, markerData) {
  const { myGeoLocation, getGeoLocation } = useGeoLocation();
  const [, setMarkers] = useState([]);
  // 클릭한 장소에 대한 정보
  const [currentPlaceInfo, setCurrentPlaceInfo] = useState({});
  const [isVisiblePlaceInfo, setVisiblePlaceInfo] = useState(false);
  // 카카오 맵 오브젝트
  const [kakaoMap, setKakaoMap] = useState(null);

  // 맵 초기화
  const initMap = useCallback(() => {
    const { lat, lng } = myGeoLocation;
  
    if (!lat || !lng) return;
    // 지도를 생성할 때 필요한 기본 옵션
    const options = {
      // 지도의 중심좌표.
      center: new window.kakao.maps.LatLng(lat, lng),
      // 지도의 레벨(확대, 축소 정도)
      level: MapLevel,
    };

    // map
    const mapObj = new window.kakao.maps.Map(container.current, options);

    // save center position

    const center = mapObj.getCenter();
    // change viewport size
    const { width, height } = MapSize;
    container.current.style.width = width;
    container.current.style.height = height;

    // 맵 레이아웃 업데이트
    mapObj.relayout();
    // restore
    mapObj.setCenter(center);

    // 현재위치 마킹
    mapObj.panTo(new kakao.maps.LatLng(lat, lng));
    const gpsContent =
      '<div><img class="Nomad-map-pulse" draggable="false" unselectable="on" src="https://ssl.pstatic.net/static/maps/m/pin_rd.png" alt=""></div>';
    const currentOverlay = new kakao.maps.CustomOverlay({
      position: new kakao.maps.LatLng(lat, lng),
      content: gpsContent,
      mapObj,
    });
    currentOverlay.setMap(mapObj);

    setKakaoMap(mapObj);
  }, [container, myGeoLocation]);

  // 맵 script 추가
  const addKakaoMapScript = useCallback(() => {
    const script = document.createElement('script');
    /* global kakao */
    script.onload = () => kakao.maps.load(initMap);
    script.src = `${KAKAO_SDK_URI()}?autoload=false&appkey=${KAKAO_APP_KEY}`;
    document.head.appendChild(script);

    const scriptLibrary = document.createElement('script');
    scriptLibrary.src = `${KAKAO_SDK_URI()}?autoload=false&libraries=services&appkey=${KAKAO_APP_KEY}`;
    document.head.appendChild(scriptLibrary);
  }, [initMap]);

  // 카카오맵 초기화
  useEffect(() => {
    window.kakao && window.kakao.maps ? initMap() : addKakaoMapScript();
  }, [addKakaoMapScript, initMap]);

  // 마커를 제외한 맵 클릭시 초기화
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }

    window.kakao.maps.event.addListener(kakaoMap, 'click', () => {
      setCurrentPlaceInfo({});
      setVisiblePlaceInfo(false);
      if (selectedMarker) {
        selectedMarker.setImage(selectedMarker.normalImage);
        selectedMarker = null;
      }
    });
  }, [kakaoMap]);

  // 맵에 마커 추가
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    if (!window?.kakao || window?.kakao?.maps === null) {
      return;
    }

    // 카카오 API 검색 결과에 대해서만 setBounds를 한다
    const isMapData = markerData.reduce((acc, { isNewPlace, isExistPlace }) => {
      return !(isNewPlace || isExistPlace);
    }, true);
    // 카카오 API 검색 결과에 대해서만 setBounds를 한다
    const positions = markerData.map(
      ({ latitude, longitude }) =>
        new window.kakao.maps.LatLng(latitude, longitude)
    );
    setMarkers((markers) => {
      // clear prev markers
      markers.forEach((marker) => marker.setMap(null));

      // assign new markers
      return markerData.map((el) => {
        const { latitude, longitude, kakaoId } = el;

        const hasCheckedIn = hasCheckedInById(kakaoId);

        const { normalImage, overImage, clickImage, checkedInImage } =
          getMarkerImages();

        // 마커를 생성하고 이미지는 기본 마커 이미지를 사용합니다
        const marker = new window.kakao.maps.Marker({
          map: kakaoMap,
          position: new window.kakao.maps.LatLng(latitude, longitude),
          image: hasCheckedIn ? checkedInImage : normalImage,
        });
        // 마커에 표시할 인포윈도우를 생성합니다
        const infowindow = new window.kakao.maps.InfoWindow({
          content: getInfoWindow(el),
        });

        // 마커 객체에 마커아이디와 마커의 기본 이미지를 추가합니다
        marker.normalImage = hasCheckedIn ? checkedInImage : normalImage;

        // 마커에 mouseover 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, 'mouseover', () => {
          // 클릭된 마커가 없고, mouseover된 마커가 클릭된 마커가 아니면
          // 마커의 이미지를 오버 이미지로 변경합니다
          if (!selectedMarker || selectedMarker !== marker) {
            marker.setImage(overImage);
          }
          infowindow.open(kakaoMap, marker);
        });

        // 마커에 mouseout 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, 'mouseout', () => {
          // 클릭된 마커가 없고, mouseout된 마커가 클릭된 마커가 아니면
          // 마커의 이미지를 기본 이미지로 변경합니다
          if (!selectedMarker || selectedMarker !== marker) {
            marker.setImage(hasCheckedIn ? checkedInImage : normalImage);
          }
          infowindow.close();
        });

        // 마커에 click 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, 'click', () => {
          setCurrentPlaceInfo(el);
          setVisiblePlaceInfo(true);
          // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
          // 마커의 이미지를 클릭 이미지로 변경합니다
          if (!selectedMarker || selectedMarker !== marker) {
            // 클릭된 마커 객체가 null이 아니면
            // 클릭된 마커의 이미지를 기본 이미지로 변경하고
            !!selectedMarker &&
              selectedMarker.setImage(selectedMarker.normalImage);

            // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
            marker.setImage(clickImage);
          }

          // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
          selectedMarker = marker;
        });
        return marker;
      });
    });

    // 카카오 API 검색 결과에 대해서만 setBounds를 한다
    if (!isMapData && positions.length > 0) {
      const bounds = positions.reduce(
        (_bounds, latlng) => _bounds.extend(latlng),
        new window.kakao.maps.LatLngBounds()
      );

      kakaoMap.setBounds(bounds);
    }
  }, [kakaoMap, markerData]);

  return {
    kakaoMap,
    currentPlaceInfo,
    setCurrentPlaceInfo,
    isVisiblePlaceInfo,
    myGeoLocation,
    getGeoLocation,
  };
}
