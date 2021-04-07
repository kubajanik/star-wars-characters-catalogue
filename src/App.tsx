import React, {useEffect, useState} from 'react';
import {CharactersList} from './components/characters-list';
import {Character} from './models/Character';

export default function App() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/people')
      .then(response => response.json())
      .then(({results}) => setCharacters(results));
  }, []);

  return (
    <div className="App">
      <CharactersList characters={characters} />
    </div>
  );
}
