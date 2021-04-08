import ReactDropdown, {Option} from 'react-dropdown';
import 'react-dropdown/style.css';
import styled from 'styled-components';

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
  options: Option[];
  onChange: (value: string) => void;
};

export function Dropdown({options, onChange}: Props) {
  const dropdownOptions = [{value: '', label: 'Choose a film'}, ...options];

  return (
    <StyledDropdown 
      options={dropdownOptions} 
      onChange={option => onChange(option.value)}
      value=""
    />
  )
}