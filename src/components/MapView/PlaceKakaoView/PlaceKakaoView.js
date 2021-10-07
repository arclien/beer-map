import React from 'react';

import { KakaoPlaceUrl, KakaoPlaceMobileUrl } from 'constants/kakaoMap';
import useMobileDetect from 'hooks/useMobileDetect';

import { Container } from './PlaceKakaoView.styles';

const PlaceKakaoView = ({ currentPlaceInfo }) => {
  const isMobile = useMobileDetect();

  return (
    <Container>
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        framespacing="0"
        title={currentPlaceInfo.kakaoId}
        src={`${isMobile ? KakaoPlaceMobileUrl : KakaoPlaceUrl}${
          currentPlaceInfo.kakaoId
        }`}
      />
    </Container>
  );
};

export default PlaceKakaoView;
