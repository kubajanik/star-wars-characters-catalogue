import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {NameSearchBox} from '../NameSearchBox';

test('should display passed name in the input', () => {
  const name = 'Luke';
  render(<NameSearchBox name={name} onChange={jest.fn()}/>);

  expect(screen.getByRole('textbox')).toHaveValue(name);
});

test('should call onChange when input value changes', () => {
  const onChange = jest.fn();
  render(<NameSearchBox onChange={onChange}  name="" />);

  const newName = 'Ow';
  userEvent.type(screen.getByRole('textbox'), newName);

  expect(onChange).toHaveBeenCalledWith(newName[0]);
  expect(onChange).toHaveBeenCalledWith(newName[1]);
  expect(onChange).toHaveBeenCalledTimes(newName.length);
});