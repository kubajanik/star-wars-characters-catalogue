import React from 'react';
import {CharactersList} from './CharactersList';
import styled, {createGlobalStyle} from 'styled-components';
import {NameSearchBox} from './NameSearchBox';
import {FilmsDropdown} from './FilmsDropdown';
import {useCharactersSearch} from '../hooks/useCharactersSearch';
import {useCharactersQuery} from '../hooks/useCharactersQuery';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import Loader from 'react-spinners/FadeLoader';

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
  const {data, loading, error, fetchMore} = useCharactersQuery()
  const [
    filteredCharacters, 
    {nameQuery}, 
    {setNameQuery, setFilmQuery}
  ] = useCharactersSearch(data?.allCharacters.characters);

  const [infiniteRef] = useInfiniteScroll({
    rootMargin: '100px',
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
        <NameSearchBox name={nameQuery} onChange={setNameQuery} />

        <FilmsDropdown onChange={setFilmQuery} />
      </FiltersSection>

      <CharactersList characters={filteredCharacters} />

      {(data?.allCharacters.pageInfo.hasNextPage || loading) && (
        <>
          <Loader color="#444262" />
          <div ref={infiniteRef} />
        </>
      )}

      {error && <div>Failed to fetch characters</div>}
    </Container>
  );
}
