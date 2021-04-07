import React, {useEffect, useState} from 'react';
import {CharactersList} from './components/characters-list';
import {Character} from './models/Character';
import styled, {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e6e4e6;
    font-family: 'DM Sans', sans-serif;
    margin: 0;
  }
`;

const Container = styled.main`
  display: flex;
  justify-content: center;
`;

export default function App() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/people')
      .then(response => response.json())
      .then(({results}) => setCharacters(results));
  }, []);

  return (
    <Container>
      <GlobalStyle />
      <CharactersList characters={characters} />
    </Container>
  );
}
