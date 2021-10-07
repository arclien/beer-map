import styled from 'styled-components';
import { gray400, flexContainer, font } from 'remember-ui';

export const Container = styled.div`
  ${flexContainer('space-between', 'center')};

  position: relative;
  width: 100%;
  margin-bottom: 10px;
`;

export const Half = styled.div`
  ${flexContainer('center', 'flex-start', 'column')};

  width: ${({ isFull }) => (isFull ? '100%' : '48%')};
`;

export const Title = styled.div`
  ${font({ size: '14px', weight: 'bold', color: '#010101' })};

  line-height: 1.54;
  letter-spacing: -0.4px;
  margin-right: 5px;
`;

export const Value = styled.div`
  ${font({ size: '13px', color: gray400 })};
  line-height: 1.54;
  letter-spacing: -0.4px;
`;

export const TooltipWrapper = styled.div`
  ${flexContainer('flex-start', 'center')};
`;
