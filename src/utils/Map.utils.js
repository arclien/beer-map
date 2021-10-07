import {
  SPRITE_MARKER_URL,
  MARKER_WIDTH,
  MARKER_HEIGHT,
  OFFSET_X,
  OFFSET_Y,
  OVER_MARKER_WIDTH,
  OVER_MARKER_HEIGHT,
  OVER_OFFSET_X,
  OVER_OFFSET_Y,
  SPRITE_WIDTH,
  SPRITE_HEIGHT,
  SPRITE_GAP,
} from 'constants/kakaoMap';

import checkedInImageFile from 'assets/images/ico-support-local-pin.png';

// MakrerImage 객체를 생성하여 반환하는 함수입니다
export const createMarkerImage = (
  markerSize,
  offset,
  spriteOrigin,
  spriteImageSize,
  imageUrl
) => {
  if (!window?.kakao || window?.kakao?.maps === null) {
    return;
  }
  const KakaoMapObj = window.kakao.maps;

  const markerImage = new KakaoMapObj.MarkerImage(
    imageUrl || SPRITE_MARKER_URL, // 스프라이트 마커 이미지 URL
    markerSize, // 마커의 크기
    {
      offset, // 마커 이미지에서의 기준 좌표
      spriteOrigin, // 스트라이프 이미지 중 사용할 영역의 좌상단 좌표
      spriteSize: spriteImageSize, // 스프라이트 이미지의 크기
    }
  );

  return markerImage;
};

export const getMarkerImages = () => {
  if (!window?.kakao || window?.kakao?.maps === null) {
    return;
  }
  const KakaoMapObj = window.kakao.maps;

  const markerSize = new KakaoMapObj.Size(MARKER_WIDTH, MARKER_HEIGHT); // 기본, 클릭 마커의 크기
  const markerOffset = new KakaoMapObj.Point(OFFSET_X, OFFSET_Y); // 기본, 클릭 마커의 기준좌표
  const overMarkerSize = new KakaoMapObj.Size(
    OVER_MARKER_WIDTH,
    OVER_MARKER_HEIGHT
  ); // 오버 마커의 크기
  const overMarkerOffset = new KakaoMapObj.Point(OVER_OFFSET_X, OVER_OFFSET_Y); // 오버 마커의 기준 좌표
  const spriteImageSize = new KakaoMapObj.Size(SPRITE_WIDTH, SPRITE_HEIGHT); // 스프라이트 이미지의 크기

  const gapX = MARKER_WIDTH + SPRITE_GAP; // 스프라이트 이미지에서 마커로 사용할 이미지 X좌표 간격 값
  const originY = 0; // 스프라이트 이미지에서 기본, 클릭 마커로 사용할 Y좌표 값
  const overOriginY = 0; // 스프라이트 이미지에서 오버 마커로 사용할 Y좌표 값
  const normalOrigin = new KakaoMapObj.Point(0, originY); // 스프라이트 이미지에서 기본 마커로 사용할 영역의 좌상단 좌표
  const clickOrigin = new KakaoMapObj.Point(gapX, originY); // 스프라이트 이미지에서 마우스오버 마커로 사용할 영역의 좌상단 좌표
  const overOrigin = new KakaoMapObj.Point(gapX * 2, overOriginY); // 스프라이트 이미지에서 클릭 마커로 사용할 영역의 좌상단 좌표

  // 마커를 생성하고 지도위에 표시합니다
  // 기본 마커이미지, 오버 마커이미지, 클릭 마커이미지를 생성합니다
  const normalImage = createMarkerImage(
    markerSize,
    markerOffset,
    normalOrigin,
    spriteImageSize
  );
  const overImage = createMarkerImage(
    overMarkerSize,
    overMarkerOffset,
    overOrigin,
    spriteImageSize
  );
  const clickImage = createMarkerImage(
    markerSize,
    markerOffset,
    clickOrigin,
    spriteImageSize
  );
  const checkedInImage = createMarkerImage(
    new KakaoMapObj.Size(40, 46),
    new KakaoMapObj.Point(12, OFFSET_Y),
    normalOrigin,
    new KakaoMapObj.Size(40, 46),
    checkedInImageFile
  );

  return {
    normalImage,
    overImage,
    clickImage,
    checkedInImage,
  };
};
