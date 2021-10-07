import React from 'react';

import MapSearch from '../MapSearch/MapSearch';

import { AddButton } from './SearchPlace.styles';

const SearchPlace = ({
  isAbleToSearch,
  keywordSearch,
  setAbleToSearch,
  setKeywordSearch,
}) => {
  return (
    <>
      {!isAbleToSearch && (
        <AddButton onClick={() => setAbleToSearch(true)}>
          신규 장소 검색
        </AddButton>
      )}

      {isAbleToSearch && (
        <MapSearch
          keywordSearch={keywordSearch}
          setKeywordSearch={setKeywordSearch}
          setAbleToSearch={setAbleToSearch}
        />
      )}
    </>
  );
};

export default SearchPlace;
