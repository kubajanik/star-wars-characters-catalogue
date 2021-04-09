import {ForwardedRef, forwardRef, useState} from 'react';
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

const DetailsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  row-gap: 1rem;
  column-gap: 2rem;
  grid-template-columns: auto auto;
`;

const Label = styled.span`
  color: #83829a;
  font-weight: 400;
`;

const Value = styled.span`
  color: #444262;
  font-weight: 500;
`;

const List = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: #444262;
  font-weight: 500;
`;

interface Props {
  character: Character;
};

export const CharacterItem = forwardRef(({character}: Props, ref: ForwardedRef<HTMLLIElement>) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Item 
      ref={ref}
      onClick={() => setExpanded(!expanded)} 
    >
      {expanded ? (
        <DetailsWrapper>
          <Grid>
            <Label>Name</Label> 
            <Value>{character.name}</Value>

            <Label>Birth year</Label> 
            <Value>{character.birthYear}</Value>

            <Label>Height</Label> 
            <Value>{character.height}</Value>

            <Label>Gender</Label> 
            <Value>{character.gender}</Value>
          </Grid>

          <List aria-label="films">
            <Label>Films</Label> 
            {character.filmConnection.films.map(({title}) => (
              <li key={title}>{title}</li>
            ))}
          </List>
        </DetailsWrapper>
      ) : (
        <>
          <Attribute>{character.name}</Attribute>
          <Attribute>{character.birthYear}</Attribute>
          <Attribute>{character.gender}</Attribute>
        </>
      )}
    </Item>
  )
})