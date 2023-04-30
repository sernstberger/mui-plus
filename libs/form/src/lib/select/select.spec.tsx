import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../form/form';
import Select, { SelectProps } from './select';

interface AppProps
  extends Omit<SelectProps, 'fieldName' | 'label' | 'options'> {
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
      <Select
        fieldName="name"
        required={required}
        disabled={disabled}
        label="Name"
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
    expect(screen.getByLabelText(/Name/i)).toBeTruthy();
  });
  it('should not allow submit if required', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required />);
    expect(screen.getByLabelText(/Name/i)).toBeTruthy();

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText('Name is required.')).toBeInTheDocument();
  });

  it('should submit if required and user selects data from list', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(() => { });

    render(<App onSubmit={mockSubmit} required />);
    expect(screen.getByLabelText(/Name/i)).toBeTruthy();

    await user.click(screen.getByLabelText(/Name/i));
    await user.click(screen.getByText('Dog'));
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ name: 'dog' }]]);
  });

  it('should allow submit if not required', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required={false} />);
    expect(screen.getByLabelText(/Name/i)).toBeTruthy();

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ name: '' }]]);
  });

  it('should allow submit if input is disabled', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required disabled />);
    expect(screen.getByLabelText(/Name/i)).toBeTruthy();

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ name: '' }]]);
  });

  it('should get default value', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required defaultValue="Dog" />);
    expect(screen.getByLabelText(/Name/i)).toBeTruthy();

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ name: 'Dog' }]]);
  });
});
