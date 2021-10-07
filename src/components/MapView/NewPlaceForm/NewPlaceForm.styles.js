import styled from 'styled-components';
import {
  white,
  gray100,
  gray400,
  flexContainer,
  font,
  text,
  BaseInput,
  Radio,
  Select,
} from 'remember-ui';

export const Container = styled.div`
  ${flexContainer('flex-start', 'flex-start', 'column')};

  padding: 20px;
`;

export const Row = styled.div`
  ${flexContainer('space-between', 'center')};

  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

export const Input = styled(BaseInput)`
  width: 100%;

  > div > span {
    ${font({ size: '13px', weight: 'bold', color: '#010101' })};
    line-height: 1.54;
    letter-spacing: -0.4px;
  }

  > div > img {
    width: 8px;
    height: 8px;
    top: -2px;
  }
`;

export const InputHalf = styled(BaseInput)`
  width: 48%;

  > div > span {
    ${font({ size: '13px', weight: 'bold', color: '#010101' })};
    line-height: 1.54;
    letter-spacing: -0.4px;
  }

  > div > img {
    width: 8px;
    height: 8px;
    top: -2px;
  }
`;

export const SelectBox = styled(Select)`
  width: 100%;

  > div > span {
    ${font({ size: '13px', weight: 'bold', color: '#010101' })};
    line-height: 1.54;
    letter-spacing: -0.4px;
  }

  > div > img {
    width: 8px;
    height: 8px;
    top: -2px;
  }
`;

export const SelectBoxHalf = styled(Select)`
  width: 48%;

  > div > span {
    ${font({ size: '13px', weight: 'bold', color: '#010101' })};
    line-height: 1.54;
    letter-spacing: -0.4px;
  }

  > div > img {
    width: 8px;
    height: 8px;
    top: -2px;
  }
`;
