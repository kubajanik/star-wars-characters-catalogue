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
  name: string;
  onChange: (query: string) => void;
};

export function NameSearchBox({name, onChange}: Props) {
  return (
    <Input 
      value={name}
      onChange={e => onChange(e.target.value)}
      placeholder="Search by name"
    />
  );
}