import styled from 'styled-components';
import {Character} from '../models/Character';

const Item = styled.li`
  display: flex;
  padding: 1rem;
  border-radius: 0.5rem;
  background: #fff;
  cursor: pointer;

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Attribute = styled.p`
  margin: 0;
  text-align: center;
  flex: 1;
  font-weight: 500;
  color: #444262;
`;

interface Props {
  character: Character;
};

export function CharacterItem({character}: Props) {
  return (
    <Item>
     <Attribute>{character.name}</Attribute>
      <Attribute>{character.birth_year}</Attribute>
      <Attribute>{character.gender}</Attribute>
    </Item>
  )
}