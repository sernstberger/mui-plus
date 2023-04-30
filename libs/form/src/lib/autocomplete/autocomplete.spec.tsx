import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../form/form';
import Autocomplete, { AutocompleteProps } from './autocomplete';

interface AppProps
  extends Omit<AutocompleteProps, 'fieldName' | 'label' | 'options'> {
  onSubmit: (data: any) => void;
}

const App = ({
  onSubmit,
  required = false,
  disabled = false,
  defaultValue,
}: AppProps) => {
  return (
    <Form onSubmit={onSubmit}>
      <Autocomplete
        fieldName="autocomplete"
        required={required}
        disabled={disabled}
        label="Autocomplete"
        defaultValue={defaultValue}
        options={[
          { value: 'dog', label: 'Dog' },
          { value: 'cat', label: 'Cat' },
        ]}
      />
    </Form>
  );
};

describe('Input', () => {
  it('should render successfully', () => {
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} />);
    expect(screen.getByLabelText(/Autocomplete/i)).toBeTruthy();
  });
  it('should not allow submit if required', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required />);
    expect(screen.getByLabelText(/Autocomplete/i)).toBeTruthy();

    await user.click(screen.getByRole('button', { name: /Submit/i }));

    expect(screen.getByText('Autocomplete is required.')).toBeInTheDocument();
  });

  it('should submit if required and user selects data from list', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required />);
    expect(screen.getByLabelText(/Autocomplete/i)).toBeTruthy();

    await user.click(screen.getByLabelText(/Autocomplete/i));
    await user.click(screen.getByText('Dog'));

    await user.click(screen.getByRole('button', { name: /Submit/i }));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ autocomplete: 'Dog' }]]); // we're returning the object, not just the value
  });

  it('should allow submit if not required', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required={false} />);
    expect(screen.getByLabelText(/Autocomplete/i)).toBeTruthy();

    await user.click(screen.getByRole('button', { name: /Submit/i }));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ autocomplete: '' }]]);
  });

  it('should allow submit if input is disabled', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required disabled />);
    expect(screen.getByLabelText(/Autocomplete/i)).toBeTruthy();

    await user.click(screen.getByRole('button', { name: /Submit/i }));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ autocomplete: '' }]]);
  });

  it('should get default value', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required defaultValue="Dog" />);
    expect(screen.getByLabelText(/Autocomplete/i)).toBeTruthy();

    await user.click(screen.getByRole('button', { name: /Submit/i }));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ autocomplete: 'Dog' }]]);
  });
});
