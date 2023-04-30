import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../form/form';
import Email, { EmailProps } from './email';

interface AppProps extends Omit<EmailProps, 'fieldName' | 'label'> {
  onSubmit: (data: any) => void;
}

const App = ({
  onSubmit,
  required = false,
  disabled = false,
  defaultValue,
  minLength,
  maxLength,
  min,
  max,
}: AppProps) => {
  return (
    <Form onSubmit={onSubmit}>
      <Email
        fieldName="email"
        required={required}
        disabled={disabled}
        label="Email"
        defaultValue={defaultValue}
      // minLength={minLength}
      // maxLength={maxLength}
      // min={min}
      // max={max}
      />
    </Form>
  );
};

describe('Email', () => {
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

    expect(screen.getByText('Email is required.')).toBeInTheDocument();
  });

  it('should not submit if required and user has entered an invalid email', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(() => { });

    render(<App onSubmit={mockSubmit} required />);
    expect(screen.getByRole('textbox')).toBeTruthy();
    await user.type(screen.getByLabelText(/email/i), 'test'); // invalid email
    await user.click(screen.getByRole('button'));

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('should submit if required and user has entered valid email', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(() => { });

    render(<App onSubmit={mockSubmit} required />);
    expect(screen.getByRole('textbox')).toBeTruthy();
    await user.type(screen.getByLabelText(/email/i), 'foo@bar.com');

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();

    expect(mockSubmit.mock.calls).toEqual([[{ email: 'foo@bar.com' }]]);
  });

  it('should allow submit if not required', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required={false} />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ email: '' }]]);
  });

  it('should allow submit if input is disabled', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required disabled />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ email: '' }]]);
  });

  it('should get default value', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required defaultValue="foo@bar.com" />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ email: 'foo@bar.com' }]]);
  });
});
