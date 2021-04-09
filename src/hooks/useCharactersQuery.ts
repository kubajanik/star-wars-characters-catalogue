import {gql, useQuery} from '@apollo/client';
import {Character} from '../models/Character';

interface CharactersQueryResponse {
  allCharacters: {
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    }
    characters: Character[];
  }
};

interface CharactersQueryVariables {
  after?: string;
};

const CHARACTERS_QUERY = gql`
  query allCharacters($after: String) {
    allCharacters: allPeople(after: $after, first: 10) {
      pageInfo {
        endCursor
        hasNextPage
      }
      characters: people {
        name
        birthYear
        gender
        height
        filmConnection {
          films {
            title
          }
        }
      }
    }
  }
`;

export function useCharactersQuery(variables: CharactersQueryVariables = {}) {
  return useQuery<CharactersQueryResponse, CharactersQueryVariables>(CHARACTERS_QUERY, {
    notifyOnNetworkStatusChange: true,
    variables
  });
}