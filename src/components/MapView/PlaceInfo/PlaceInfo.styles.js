import styled from 'styled-components';
import { gray400, flexContainer, font, text } from 'remember-ui';

export const Container = styled.div`
  ${flexContainer('flex-start', 'flex-start', 'column')};

  max-height: ${({ isExpanded }) => (isExpanded ? 'calc(80vh)' : '200px')};
  position: absolute;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0px;
  width: 100%;
  height: 100%;
  padding: 18px 16px 16px;
  border: solid 3px #000000;
  background-color: #f8f8f8;

  -webkit-transition: max-height 0.8s;
  -moz-transition: max-height 0.8s;
  transition: max-height 0.8s;
`;

export const Info = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const InfoBody = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: ${({ isExpanded }) => (isExpanded ? 'scroll' : 'hidden')}; ;
`;

export const ExpandIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 100;
  left: 0;
  right: 0;
  top: -40px;
  width: 100px;
  height: 20px;
  margin: 0 auto;
  cursor: pointer;

  height: 34px;
  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.3), inset 4px 4px 0 0 #ffefb4,
    inset -4px -4px 0 0 #d4ab0f;
  border: solid 4px #000000;
  background-color: #e9be1a;
`;

export const Row = styled.div`
  ${flexContainer('flex-start')};

  position: relative;
  width: 100%;
`;

export const Header = styled.div`
  ${font({ size: '18px', weight: 'bold', color: '#000' })};

  letter-spacing: -1.26px;
  margin-bottom: 8px;
  margin-right: 5px;
`;

export const Title = styled.div`
  ${font({ size: '14px', weight: 'bold', color: '#000' })};

  cursor: pointer;
  letter-spacing: -1.26px;
  margin-bottom: 8px;
  margin-right: 5px;
`;

export const Text = styled.div`
  ${font({ size: '13px', color: gray400 })};

  cursor: pointer;
  letter-spacing: -1.26px;
  margin-bottom: 8px;
  margin-right: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

export const Review = styled.div`
  ${font({ size: '16px', color: text })};
`;

export const CheckIn = styled.div``;

export const Logo = styled.img`
  width: 100px;
  height: 50px;
  position: absolute;
  right: -10px;
  top: -47px;
`;

export const Icons = styled.div`
  z-index: 999;
  width: 100px;
  height: 34px;
  position: absolute;
  right: -11px;
  top: -15px;
  text-align: right;
`;
