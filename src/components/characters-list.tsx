import styled from 'styled-components';
import {Character} from '../models/Character';
import {CharacterItem} from './character-item';
import FlipMove from 'react-flip-move';

const Wrapper = styled.div`
  width: 100%;
`;

const List = styled(FlipMove)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LabelsWrapper = styled.div`
  display: flex;
  padding: 0 1rem 0.5rem 1rem;

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