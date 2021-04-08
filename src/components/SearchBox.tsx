import styled from 'styled-components';


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

interface Props {
  query: string;
  onChange: (query: string) => void;
};

export function SearchBox({query, onChange}: Props) {
  return (
    <Input 
      value={query}
      onChange={e => onChange(e.target.value)}
      placeholder="Search by name"
    />
  );
}