import styled from 'styled-components';
import { flexContainer, font, BasePopover, PopoverItem } from 'remember-ui';

export const Container = styled.div`
  width: 123px;
  height: 41px;
  position: absolute;
  top: 16px;
  left: 10px;
  z-index: 100;
`;

export const Filters = styled.div`
  ${flexContainer('space-evenly', 'center', 'row')};

  height: 100%;
  background-color: #f5f5f5;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
`;

Filters.Option = styled.div`
  ${flexContainer('center', 'center', '')};
  ${font({ size: '10px' })};

  cursor: pointer;
  width: 41px;
  height: 41px;
  border: solid 3px #000000;
  box-shadow: inset 6px 6px 0 0 #ffffff, inset -6px -6px 0 0 #bdbdbd;
`;

Filters.Option.Drink = styled(Filters.Option)`
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  border-right: solid 2px #000000;
`;

Filters.Option.Food = styled(Filters.Option)`
  border-left: solid 2px #000000;
  border-right: solid 2px #000000;
`;

Filters.Option.Category = styled(Filters.Option)`
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  border-left: solid 2px #000000;
`;

export const FilterPopover = styled(BasePopover)``;
FilterPopover.Item = styled(PopoverItem)``;
