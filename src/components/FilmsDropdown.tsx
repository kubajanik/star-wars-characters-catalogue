import ReactDropdown, {Option} from 'react-dropdown';
import 'react-dropdown/style.css';
import styled from 'styled-components';
import {useFilmsQuery} from '../hooks/useFilmsQuery';

const StyledDropdown = styled(ReactDropdown)`
  &&& .Dropdown-control {
    color: #83829a;
    border: 0;
    border-radius: 0.5rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 1rem;
  }

  &&& .Dropdown-menu {
    border: 0;
    border-radius: 0.5rem;
    margin-top: 0.25rem;
    max-height: unset;
  }

  &&& .Dropdown-arrow {
    color: #83829a;
    top: 50%;
    transform: translateY(-50%);
    right: 1rem;
  }
`;

interface Props {
  onChange: (value: string) => void;
};

export function FilmsDropdown({onChange}: Props) {
  const {data, loading} = useFilmsQuery();

  const options = data?.allFilms.films.map(({title}) => ({
    value: title,
    label: title
  })) as Option[];

  const defaultOption = {value: '', label: 'Choose a film'};

  return (
    <StyledDropdown 
      options={loading ? [defaultOption] : [defaultOption, ...options]} 
      onChange={option => onChange(option.value)}
      value=""
    />
  );
}