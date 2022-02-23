import React from 'react';

import useGoogleSheet from 'hooks/useGoogleSheet';
import { DRINK, FOOD, CATEGORY, PLACE } from 'utils/Text.utils';

import { Container, Filters, FilterPopover } from './MapFilter.styles';

const MapFilter = ({ setMarkerData }) => {
  const { getGoogleSheetMapData } = useGoogleSheet();

  const filterMarker = async (filter, option) => {
    const mapData = await getGoogleSheetMapData();
    const filteredMapData = mapData.filter((el) => el[filter] === option);
    setMarkerData(filteredMapData);
  };

  return (
    <Container>
      <Filters>
        <Filters.Option.Drink>
          <FilterPopover
            distance="15"
            size="small"
            placement="bottom"
            content={
              <>
                {Object.entries(DRINK).map((option) => {
                  return (
                    <FilterPopover.Item
                      key={option[0]}
                      onClick={() => filterMarker('drink', option[0])}
                    >
                      {option[1]}
                    </FilterPopover.Item>
                  );
                })}
              </>
            }
          >
            음료
          </FilterPopover>
        </Filters.Option.Drink>
        <Filters.Option.Food>
          <FilterPopover
            distance="15"
            size="small"
            placement="bottom"
            content={
              <>
                {Object.entries(FOOD).map((option) => {
                  return (
                    <FilterPopover.Item
                      key={option[0]}
                      onClick={() => filterMarker('food', option[0])}
                    >
                      {option[1]}
                    </FilterPopover.Item>
                  );
                })}
              </>
            }
          >
            음식
          </FilterPopover>
        </Filters.Option.Food>
        <Filters.Option.Place>
          <FilterPopover
            distance="15"
            size="small"
            placement="bottom"
            content={
              <>
                {Object.entries(PLACE).map((option) => {
                  return (
                    <FilterPopover.Item
                      key={option[0]}
                      onClick={() => filterMarker('place', option[0])}
                    >
                      {option[1]}
                    </FilterPopover.Item>
                  );
                })}
              </>
            }
          >
            지역
          </FilterPopover>
        </Filters.Option.Place>

        <Filters.Option.Category>
          <FilterPopover
            distance="15"
            size="small"
            placement="bottom"
            content={
              <>
                {Object.entries(CATEGORY).map((option) => {
                  return (
                    <FilterPopover.Item
                      key={option[0]}
                      onClick={() => filterMarker('category', option[0])}
                    >
                      {option[1]}
                    </FilterPopover.Item>
                  );
                })}
              </>
            }
          >
            카테고리
          </FilterPopover>
        </Filters.Option.Category>
      </Filters>
    </Container>
  );
};

export default MapFilter;
