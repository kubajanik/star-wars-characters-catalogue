import styled from 'styled-components';
import {Character} from '../models/Character';
import {CharacterItem} from './character-item';

const Wrapper = styled.div`
  width: 100%;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
  padding: 0;
`;

const LabelsWrapper = styled.div`
  display: flex;
  padding-bottom: 0.5rem;

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Label = styled.div`
  text-align: center;
  flex: 1;
  text-transform: uppercase;
  color: #83829a;
  font-size: smaller;
`;

interface Props {
  characters?: Character[];
};

export function CharactersList({characters}: Props) {
  return (
    <Wrapper>
      <LabelsWrapper>
        <Label>Name</Label>
        <Label>Birth year</Label>
        <Label>Gender</Label>
      </LabelsWrapper>

      <List>
        {characters?.map(character => (
          <CharacterItem key={character.name} character={character} />
        ))}
      </List>
    </Wrapper>
  )
}