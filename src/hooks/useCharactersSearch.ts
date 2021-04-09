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

function filterCharacters(characters: Character[], nameQuery: string, filmQuery: string): Character[] {
  if (nameQuery || filmQuery) {
    return characters.filter(character => 
      character.name.includes(nameQuery) && 
      character.filmConnection.films.filter(film => film.title.includes(filmQuery)).length
    );
  } else {
    return characters;
  }
}

export function useCharactersSearch(characters: Character[] = []): CharactersSearchResult {
  const [nameQuery, setNameQuery] = useState('');
  const [filmQuery, setFilmQuery] = useState('');
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>(() => 
    filterCharacters(characters, nameQuery, filmQuery)
  ); 

  useEffect(() => {
    if (characters.length === 0) return;
    
    setFilteredCharacters(
      filterCharacters(characters, nameQuery, filmQuery)
    );
  }, [nameQuery, filmQuery, characters]);

  return [filteredCharacters, {nameQuery, filmQuery}, {setNameQuery, setFilmQuery}];
};