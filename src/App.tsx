import React from 'react';
import {CharactersList} from './components/characters-list';
import styled, {createGlobalStyle} from 'styled-components';
import {SearchBox} from './components/SearchBox';
import {FilmsDropdown} from './components/FilmsDropdown';
import {useCharactersSearch} from './hooks/useCharactersSearch';
import {useCharactersQuery} from './hooks/useCharactersQuery';
import useInfiniteScroll from 'react-infinite-scroll-hook';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e6e4e6;
    font-family: 'DM Sans', sans-serif;
    margin: 0;
    overflow-y: scroll;
  }
`;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 0 auto;
  max-width: 800px;
  padding: 2rem;
`;

const Header = styled.h1`
  margin: 0;
  color: #444262;
  font-size: 2.5rem;
  text-align: center;
`;

const FiltersSection = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
  }
`;


export default function App() {
  const {data, loading, fetchMore} = useCharactersQuery()
  const [
    filteredCharacters, 
    {nameQuery}, 
    {setNameQuery, setFilmQuery}
  ] = useCharactersSearch(data?.allCharacters.characters);


  const [infiniteRef] = useInfiniteScroll({
    loading,
    hasNextPage: data?.allCharacters.pageInfo.hasNextPage ?? false,
    onLoadMore: () => {
      fetchMore({
        variables: {
          after: data?.allCharacters.pageInfo.endCursor
        }
      })
    }
  })

  return (
    <Container>
      <GlobalStyle />

      <Header>Star Wars Characters</Header>

      <FiltersSection>
        <SearchBox query={nameQuery} onChange={setNameQuery} />

        <FilmsDropdown onChange={setFilmQuery} />
      </FiltersSection>

      <CharactersList characters={filteredCharacters} />

      {(data?.allCharacters.pageInfo.hasNextPage || loading) && <div ref={infiniteRef}>Loading...</div>}
    </Container>
  );
}
