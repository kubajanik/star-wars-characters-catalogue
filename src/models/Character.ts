import {Film} from './Film';

export interface Character {
  name: string;
  birthYear: string;
  gender: string;
  height: string;
  filmConnection: {
    films: Film[]
  }
};