import {Character} from '../models/Character';

interface Props {
  character: Character;
};

export function CharacterItem({character}: Props) {
  return (
    <li>
      {character.name}
      {character.birth_year} |
      {character.gender}
    </li>
  )
}