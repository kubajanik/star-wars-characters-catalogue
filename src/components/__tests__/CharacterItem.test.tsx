import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {Character} from '../../models/Character';
import {CharacterItem} from '../CharacterItem';
import '@testing-library/jest-dom/extend-expect';

const character: Character = {
  name: 'Luke Skywalker',
  birthYear: '19BBY',
  gender: 'male',
  height: '172',
  filmConnection: {
    films: [
      {title: 'A New Hope'},
      {title: 'The Empire Strikes Back'}
    ]
  }
};

test('should display only name, birth year and gender by default', () => {
  render(<CharacterItem character={character} />);

  expect(screen.queryByText(character.name)).toBeInTheDocument();
  expect(screen.queryByText(character.birthYear)).toBeInTheDocument();
  expect(screen.queryByText(character.gender)).toBeInTheDocument();

  expect(screen.queryByText(character.height)).not.toBeInTheDocument();
});

test('should display more information after item was clicked', () => {
  render(<CharacterItem character={character} />);

  userEvent.click(screen.getByText(character.name));

  expect(screen.queryByText(character.name)).toBeInTheDocument();
  expect(screen.queryByText(character.birthYear)).toBeInTheDocument();
  expect(screen.queryByText(character.gender)).toBeInTheDocument();
  expect(screen.queryByText(character.height)).toBeInTheDocument();
  
  const films = screen.getAllByRole('listitem')
    .slice(1)
    .map(item => item.textContent);

  const expectedFilms = character.filmConnection.films.map(film => film.title);
  expect(films).toEqual(expectedFilms);
});