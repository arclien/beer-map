import { getAppEnv } from 'routers/env';

export const { REACT_APP_KAKAO_APP_KEY: KAKAO_APP_KEY } = process.env;

export const KAKAO_SDK_URI = () => {
  switch (getAppEnv()) {
    case 'production':
      return 'https://dapi.kakao.com/v2/maps/sdk.js';
    case 'development':
    default:
      return 'https://dapi.kakao.com/v2/maps/sdk.js';
  }
};

export const MARKER_WIDTH = 33; // 기본, 클릭 마커의 너비
export const MARKER_HEIGHT = 36; // 기본, 클릭 마커의 높이
export const OFFSET_X = 12; // 기본, 클릭 마커의 기준 X좌표
export const OFFSET_Y = MARKER_HEIGHT; // 기본, 클릭 마커의 기준 Y좌표
export const OVER_MARKER_WIDTH = 40; // 오버 마커의 너비
export const OVER_MARKER_HEIGHT = 42; // 오버 마커의 높이
export const OVER_OFFSET_X = 13; // 오버 마커의 기준 X좌표
export const OVER_OFFSET_Y = OVER_MARKER_HEIGHT; // 오버 마커의 기준 Y좌표
export const SPRITE_MARKER_URL =
  'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markers_sprites2.png'; // 스프라이트 마커 이미지 URL
export const SPRITE_WIDTH = 126; // 스프라이트 이미지 너비
export const SPRITE_HEIGHT = 146; // 스프라이트 이미지 높이
export const SPRITE_GAP = 10; // 스프라이트 이미지에서 마커간 간격

export const MapLevel = 5;
export const MapSize = { width: '100vw', height: '100vh' };
export const KakaoPlaceUrl = `https://place.map.kakao.com/`;
export const KakaoPlaceMobileUrl = `https://place.map.kakao.com/m/`;
