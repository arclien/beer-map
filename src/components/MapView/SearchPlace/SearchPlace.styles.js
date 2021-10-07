import styled from 'styled-components';
import { font, NewBaseButton, white } from 'remember-ui';

export const AddButton = styled(NewBaseButton)`
  ${font({ size: '14px', weight: 'bold', color: white })};

  width: calc(100vw - 32px);
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 16px;
  margin: 0 auto;
  z-index: 100;

  line-height: 1.86;
  letter-spacing: -1.23px;

  height: 44px;
  padding: 9px;
  border-radius: 4px;
  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.3), inset 4px 4px 0 0 #878787,
    inset -4px -4px 0 0 #232323;
  border: solid 2px #000000;
  background-color: #383838;
`;
