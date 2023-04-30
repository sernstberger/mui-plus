import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../form/form';
import Input, { InputProps } from './input';

interface AppProps extends Omit<InputProps, 'fieldName' | 'label'> {
  onSubmit: (data: any) => void;
}

const App = ({
  onSubmit,
  required = false,
  disabled = false,
  defaultValue,
  minLength,
  maxLength, min, max
}: AppProps) => {
  return (
    <Form onSubmit={onSubmit}>
      <Input
        fieldName="name"
        required={required}
        disabled={disabled}
        label="Name"
        defaultValue={defaultValue}
        minLength={minLength}
        maxLength={maxLength}
        min={min}
        max={max}
      />
    </Form>
  );
};

describe('Input', () => {
  it('should render successfully', () => {
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} />);
    expect(screen.getByRole('textbox')).toBeTruthy();
  });
  it('should not allow submit if required', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.click(screen.getByRole('button'));

    expect(screen.getByText('Name is required.')).toBeInTheDocument();
  });

  it('should submit if required and user has entered data', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(() => { });

    render(<App onSubmit={mockSubmit} required />);
    expect(screen.getByRole('textbox')).toBeTruthy();
    await user.type(screen.getByLabelText(/name/i), 'Steve');

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();

    expect(mockSubmit.mock.calls).toEqual([[{ name: 'Steve' }]]);
  });

  it('should allow submit if not required', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required={false} />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    // expect(mockSubmit.mock.calls).toEqual([[{ name: undefined }]]);
    expect(mockSubmit.mock.calls).toEqual([[{ name: '' }]]);
  });

  it('should allow submit if input is disabled', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required disabled />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    // expect(mockSubmit.mock.calls).toEqual([[{ name: undefined }]]);
    expect(mockSubmit.mock.calls).toEqual([[{ name: '' }]]);
  });

  it('should get default value', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required defaultValue="Steve" />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ name: 'Steve' }]]);
  });

  it('should allow user to change default value', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required defaultValue="Steve" />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.type(screen.getByRole('textbox'), '{backspace}{backspace}{backspace}{backspace}{backspace}John');
    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ name: 'John' }]]);
  });

  it('should validate minLength', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} minLength={3} />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.type(screen.getByRole('textbox'), 'St');
    await user.click(screen.getByRole('button'));

    expect(
      screen.getByText('Name has a minimum of 3 characters.')
    ).toBeInTheDocument();
  });

  it('should validate maxLength', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} maxLength={5} />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.type(screen.getByRole('textbox'), 'Steven');
    await user.click(screen.getByRole('button'));

    expect(
      screen.getByText('Name has a maximum of 5 characters.')
    ).toBeInTheDocument();
  })

  it('should validate min', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} min={3} />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.type(screen.getByRole('textbox'), '2');
    await user.click(screen.getByRole('button'));

    expect(screen.getByText('Name has minimum of 3.')).toBeInTheDocument();
  })

  it('should validate max', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} max={5} />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.type(screen.getByRole('textbox'), '6');
    await user.click(screen.getByRole('button'));

    expect(screen.getByText('Name has maximum of 5.')).toBeInTheDocument();
  })
});
