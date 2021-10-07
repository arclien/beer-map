import styled from 'styled-components';
import { flexContainer, Spinner } from 'remember-ui';

export const KakaoMap = styled.div`
  width: 100%;
  min-height: 100vh;
  max-height: 100vw;
  overflow: hidden;
`;

export const SpinnerContainer = styled.div`
  ${flexContainer('center', 'center')};

  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100vh;
  max-height: 100vw;
  overflow: hidden;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
`;
export const SpinnerComponent = styled(Spinner)``;
