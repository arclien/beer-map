import React from 'react';

import { NaverPlaceMobileUrl } from 'constants/naverMap';

import { Container } from './PlaceNaverView.styles';

const PlaceNaverView = ({ currentPlaceInfo }) => {
  return (
    <Container>
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        framespacing="0"
        title={currentPlaceInfo.kakaoId}
        src={`${NaverPlaceMobileUrl}${currentPlaceInfo.naverId}`}
      />
    </Container>
  );
};

export default PlaceNaverView;
