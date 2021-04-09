import ReactDropdown, {Option} from 'react-dropdown';
import 'react-dropdown/style.css';
import styled from 'styled-components';
import {useFilmsQuery} from '../hooks/useFilmsQuery';

const StyledDropdown = styled(ReactDropdown)`
  width: 30%;

  &&& .Dropdown-control {
    color: #83829a;
    border: 0;
    border-radius: 0.5rem;
    padding: 1rem 1rem 1rem 1rem;
  }

  &&& .Dropdown-placeholder.is-selected {
    color: #444262;
  }

  &&& .Dropdown-menu {
    border: 0;
    border-radius: 0.5rem;
    margin-top: 0.25rem;
    max-height: unset;
    box-shadow: 0px 3px 5px 2px rgb(0 0 0 / 6%);
  }

  &&& .Dropdown-option {
    padding: 1rem;
    text-align: center;

    &:hover, &.is-selected {
      background: #f9f7ff;
      color: #444262;
    }
  }

  &&& .Dropdown-arrow {
    color: #83829a;
    top: 50%;
    transform: translateY(-50%);
    right: 1rem;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

interface Props {
  onChange: (value: string) => void;
};

export function FilmsDropdown({onChange}: Props) {
  const {data, loading, error} = useFilmsQuery();

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
      placeholder={error && 'Failed to fetch films'}
    />
  );
}