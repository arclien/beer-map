import React, { useState } from 'react';

import {
  Container,
  SearchInput,
  Buttons,
  SearchButton,
} from './MapSearch.styles';

const MapSearch = ({ keywordSearch, setKeywordSearch, setAbleToSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  return (
    <Container>
      <SearchInput
        autoFocus
        type="search"
        name="keywordSearch"
        value={searchInput}
        placeholder="검색할 장소를 입력하세요"
        maxLength={50}
        onChange={(e) => setSearchInput(e.target.value)}
        onEnter={() => setKeywordSearch(searchInput)}
      />
      <Buttons>
        {!keywordSearch && (
          <>
            <SearchButton
              onClick={() => {
                setAbleToSearch(false);
                setSearchInput('');
                setKeywordSearch('');
              }}
            >
              취소
            </SearchButton>
            <SearchButton onClick={() => setKeywordSearch(searchInput)}>
              검색
            </SearchButton>
          </>
        )}
        {keywordSearch && (
          <SearchButton
            full
            onClick={() => {
              setSearchInput('');
              setKeywordSearch('');
            }}
          >
            다시 검색
          </SearchButton>
        )}
      </Buttons>
    </Container>
  );
};

export default MapSearch;
