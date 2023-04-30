import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../form/form';
import Textarea, { TextareaProps } from './textarea';

interface AppProps extends Omit<TextareaProps, 'fieldName' | 'label'> {
  onSubmit: (data: any) => void;
}

const App = ({
  onSubmit,
  required = false,
  disabled = false,
  defaultValue,
  minLength,
  maxLength,
}: AppProps) => {
  return (
    <Form onSubmit={onSubmit}>
      <Textarea
        fieldName="textarea"
        required={required}
        disabled={disabled}
        label="Textarea"
        defaultValue={defaultValue}
        minLength={minLength}
        maxLength={maxLength}
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

    expect(screen.getByText('Textarea is required.')).toBeInTheDocument();
  });

  it('should submit if required and user has entered data', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(() => { });

    render(<App onSubmit={mockSubmit} required />);
    expect(screen.getByRole('textbox')).toBeTruthy();
    await user.type(screen.getByLabelText(/textarea/i), 'Steve');

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ textarea: 'Steve' }]]);
  });

  it('should allow submit if not required', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required={false} />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ textarea: '' }]]);
  });

  it('should allow submit if input is disabled', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required disabled />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ textarea: '' }]]);
  });

  it('should get default value', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required defaultValue="Steve" />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ textarea: 'Steve' }]]);
  });

  it('should validate minLength', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} minLength={3} />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.type(screen.getByRole('textbox'), 'St');
    await user.click(screen.getByRole('button'));

    expect(
      screen.getByText('Textarea has a minimum of 3 characters.')
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
      screen.getByText('Textarea has a maximum of 5 characters.')
    ).toBeInTheDocument();
  });
});
