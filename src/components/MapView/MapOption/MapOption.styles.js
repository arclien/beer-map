import styled from 'styled-components';
import { flexContainer, white } from 'remember-ui';

export const Container = styled.div`
  width: 41px;
  height: 164px;
  position: absolute;
  top: 16px;
  right: 10px;
  z-index: 100;
`;

export const Icons = styled.div`
  ${flexContainer('flex-start', '', 'column')};

  background-color: #f5f5f5;
`;
export const Icon = styled.div`
  ${flexContainer('center', 'center')};

  cursor: pointer;
  width: 41px;
  height: 41px;
  box-shadow: inset 6px 6px 0 0 #ffffff, inset -6px -6px 0 0 #bdbdbd;
  border: solid 3px #000000;
  background-color: #f5f5f5;
`;

Icons.ZoomIn = styled(Icon)`
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom: solid 2px #000000;
`;

Icons.Relocate = styled(Icon)`
  border-top: solid 2px #000000;
  border-bottom: solid 2px #000000;
`;

Icons.Reload = styled(Icon)`
  border-top: solid 2px #000000;
  border-bottom: solid 2px #000000;
`;

Icons.ZoomOut = styled(Icon)`
  border-top: solid 2px #000000;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
`;
