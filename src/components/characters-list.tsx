import {Character} from '../models/Character';
import {CharacterItem} from './character-item';

interface Props {
  characters: Character[];
};

export function CharactersList({characters}: Props) {
  return (
    <ul>
      {characters.map((character, index) => (
        <CharacterItem key={index} character={character} />
      ))}
    </ul>
  )
}