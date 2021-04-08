import {ChangeEvent} from 'react';
import styled from 'styled-components';

interface Props {
  query: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
};

const Input = styled.input`
  border: 0;
  padding: 1rem;
  font-size: 1rem;
  font-family: 'DM Sans';
  color: #444262;
  border-radius: 0.5rem;

  &::placeholder {
    color: #83829a;
  }

  &:focus {
    outline: transparent;
  }
`;

export function SearchBox({query, onChange}: Props) {
  return (
    <Input 
      value={query}
      onChange={onChange}
      placeholder="Search by name"
    />
  );
}