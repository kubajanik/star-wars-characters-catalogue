import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Character} from '../models/Character';

type CharactersSearchResult = [
  filteredCharacters: Character[],
  queries: {
    nameQuery: string;
    filmQuery: string;
  },
  setQueries: {
    setNameQuery: Dispatch<SetStateAction<string>>;
    setFilmQuery: Dispatch<SetStateAction<string>>;
  }
];

export function useCharactersSearch(characters: Character[] = []): CharactersSearchResult {
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>(characters) 
  const [nameQuery, setNameQuery] = useState('');
  const [filmQuery, setFilmQuery] = useState('');

  useEffect(() => {
    if (!nameQuery && !filmQuery) {
      setFilteredCharacters(characters);
      return;
    }

    setFilteredCharacters(
      characters.filter(character => 
        character.name.includes(nameQuery) && 
        character.filmConnection.films.filter(film => film.title.includes(filmQuery)).length
      )
    );
  }, [nameQuery, filmQuery, characters]);

  return [filteredCharacters, {nameQuery, filmQuery}, {setNameQuery, setFilmQuery}];
};