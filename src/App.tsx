import React, {useEffect, useState} from 'react';
import {CharactersList} from './components/characters-list';
import {Character} from './models/Character';
import styled, {createGlobalStyle} from 'styled-components';
import {useSearch} from 'react-use-search';
import {SearchBox} from './components/SearchBox';
import {useBottomScrollListener} from 'react-bottom-scroll-listener';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e6e4e6;
    font-family: 'DM Sans', sans-serif;
    margin: 0;
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
  width: 100%;
`;

interface Film {
  url: string;
  title: string;
};

export default function App() {
  const [films, setFilms] = useState<Film[]>([]);

  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);

  const [filteredCharacters, query, handleChange] = useSearch(characters, (character, query) => {
    return character.name.includes(query)
  }, {filter: true});

  useBottomScrollListener(() => setPage(page + 1));

  useEffect(() => {
    async function fetch() {
      setLoading(true);

      let fetchedFilms = films;
      if (!films.length) {
        const response = await window.fetch('https://swapi.dev/api/films');

        type JSONResponse = {
          results: Film[];
        };
        const {results}: JSONResponse = await response.json();

        fetchedFilms = results.map(({url, title}) => ({url, title}));
      }

      const response = await window.fetch(`https://swapi.dev/api/people?page=${page}`);

      type JSONResponse = {
        results: Character[];
        next: string;
      };
      const {results, next}: JSONResponse = await response.json();

      if (!next) return;

      const characters = results.map(character => {
        const filmTitles = character.films.map(filmUrl => {
          return fetchedFilms.find(({url}) => url === filmUrl)?.title
        }
        )
          
        const {name, birth_year, gender, height} = character; 

        return {
          name,
          birth_year,
          gender,
          height,
          films: filmTitles as string[]
        };
      });

      setFilms(fetchedFilms);
      setCharacters(c => [...c, ...characters]);
      setLoading(false); 
    }

    fetch();
  }, [page]);


  return (
    <Container>
      <GlobalStyle />

      <Header>Star Wars Characters</Header>

      <FiltersSection>
        <SearchBox query={query} onChange={handleChange} />
      </FiltersSection>

      <CharactersList characters={filteredCharacters} />
      {loading && <h1>Loading...</h1>}
    </Container>
  );
}
