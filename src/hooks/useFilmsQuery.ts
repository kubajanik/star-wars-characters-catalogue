import {gql, useQuery} from '@apollo/client';
import {Film} from '../models/Film';

interface FilmsQueryResponse {
  allFilms: {
    films: Film[];
  }
};

const FILMS_QUERY = gql`
  query allFilms {
    allFilms {
      films {
        title
      }
    }
  }
`;

export function useFilmsQuery() {
  return useQuery<FilmsQueryResponse>(FILMS_QUERY);
}