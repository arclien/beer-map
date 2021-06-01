import {
  KAKAO_APP_KEY,
  KAKAO_SDK_URI,
  DEFAULT_GEO,
  MapLevel,
} from '@/constants/kakaoMap';

export const addKakaoMapScript = container => {
  const script = document.createElement('script');
  /* global kakao */
  script.onload = () =>
    kakao.maps.load(
      () =>
        // eslint-disable-next-line comma-dangle
        initMap(DEFAULT_GEO, container)
      // eslint-disable-next-line function-paren-newline
    );
  script.src = `${KAKAO_SDK_URI()}?autoload=false&appkey=${KAKAO_APP_KEY}`;
  document.head.appendChild(script);

  const scriptLibrary = document.createElement('script');
  scriptLibrary.src = `${KAKAO_SDK_URI()}?autoload=false&libraries=services&appkey=${KAKAO_APP_KEY}`;
  document.head.appendChild(scriptLibrary);
};

export const initMap = (myGeoLocation, container) => {
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
  const mapObj = new window.kakao.maps.Map(container, options);
  // save center position
  const center = mapObj.getCenter();

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

  return mapObj;
};
