import {act, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {MockedProvider} from '@apollo/client/testing';
import {FILMS_QUERY} from '../../hooks/useFilmsQuery';
import {FilmsDropdown} from '../FilmsDropdown';

const films = [
  {title: 'A New Hope'},
  {title: 'The Empire Strikes Back'}
];

const mocks = [
  {
    request: {
      query: FILMS_QUERY,
    },
    result: {
      data: {
        allFilms: {
          films
        }
      }
    }
  }
];

async function waitForRequests() {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
  })
}

test('should display fetched films in the dropdown', async () => {
  render(
    <MockedProvider mocks={mocks}>
      <FilmsDropdown onChange={jest.fn()} />
    </MockedProvider>
  );

  await waitForRequests();

  userEvent.click(screen.getByText('Choose a film'))

  const options = screen.getAllByRole('option').map(option => option.textContent);
  const expectedFilms = films.map(film => film.title);

  expect(options).toEqual(['Choose a film', ...expectedFilms]);
});

test('should call onChange when dropdown value changes', async () => {
  const onChange = jest.fn();
  render(
    <MockedProvider mocks={mocks}>
      <FilmsDropdown onChange={onChange} />
    </MockedProvider>
  );

  await waitForRequests();

  const selectedFilm = films[1].title;
  userEvent.click(screen.getByText('Choose a film'));
  userEvent.click(screen.getByRole('option', {name: selectedFilm}));

  expect(onChange).toHaveBeenCalledWith(selectedFilm);
  expect(onChange).toHaveBeenCalledTimes(1);
});