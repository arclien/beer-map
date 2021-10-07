import styled from 'styled-components';
import {
  white,
  gray100,
  gray400,
  flexContainer,
  font,
  text,
  NewBaseButton,
} from 'remember-ui';

export const Container = styled.div`
  ${flexContainer('flex-start', 'flex-start', 'column')};

  position: absolute;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0px;
  width: 100%;
  height: 200px;
  padding: 18px 16px 16px;
  border: solid 3px #000000;
  background-color: #f8f8f8;
`;

export const Row = styled.div`
  ${flexContainer('flex-start')};

  position: relative;
  width: 100%;
  height: 25px;
`;

export const Title = styled.div`
  ${font({ size: '18px', weight: 'bold', color: '#000' })};

  letter-spacing: -1.26px;
  margin-bottom: 8px;
`;

export const MapLink = styled.div`
  ${font({ size: '16px', color: text })};

  position: absolute;
  right: 10px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const Address = styled.div`
  ${font({ size: '16px', color: '#000' })};

  line-height: 1.63;
  letter-spacing: -1.4px;
  margin-bottom: 4px;
`;

export const Phone = styled.a`
  ${font({ size: '16px', color: '#000' })};

  line-height: 1.63;
  letter-spacing: -1.4px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const AddPlaceButton = styled(NewBaseButton)`
  ${font({ size: '16px', weight: 'bold', color: '#000' })};

  line-height: 44px;
  letter-spacing: -1.37px;

  position: absolute;
  left: 0;
  right: 0;
  padding: 0 16px;
  margin: 0 auto;

  bottom: 16px;
  width: calc(100vw - 32px);
  height: 44px;
  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.3), inset 4px 4px 0 0 #ffefb4,
    inset -4px -4px 0 0 #d4ab0f;
  border: solid 2px #000000;
  background-color: #e9be1a;
`;
