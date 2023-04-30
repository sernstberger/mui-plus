import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../form/form';
import Password, { PasswordProps } from './password';

interface AppProps extends Omit<PasswordProps, 'fieldName' | 'label'> {
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
      <Password
        fieldName="password"
        required={required}
        disabled={disabled}
        label="Password"
        defaultValue={defaultValue}
        minLength={minLength}
        maxLength={maxLength}
        min={min}
        max={max}
      />
    </Form>
  );
};

describe('Password', () => {
  it('should render successfully', () => {
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} />);
    expect(screen.getByLabelText('Password')).toBeTruthy();
  });
  it('should not allow submit if required', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required />);
    expect(screen.getByText('Password')).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByText('Password is required.')).toBeInTheDocument();
  });

  it('should not submit if required and user has entered an invalid password', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(() => { });

    render(<App onSubmit={mockSubmit} required minLength={8} />);
    expect(screen.getByTestId('password')).toBeTruthy();
    await user.type(screen.getByTestId('password'), 'test'); // invalid password
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    // ****************************************
    // **** this test fails because there isn't anything to say that test is invalid
    // ****************************************
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('should submit if required and user has entered valid password', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(() => { });

    render(<App onSubmit={mockSubmit} required />);
    expect(screen.getByTestId('password')).toBeTruthy();
    await user.type(screen.getByTestId('password'), 'foo@bar.com');

    await user.click(screen.getByRole('button', { name: 'Submit' }));
    // await screen.debug(); //?

    expect(mockSubmit).toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();

    expect(mockSubmit.mock.calls).toEqual([[{ password: 'foo@bar.com' }]]);
  });

  it('should allow submit if not required', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required={false} />);
    expect(screen.getByLabelText('Password')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ password: '' }]]);
  });

  it('should allow submit if input is disabled', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required disabled />);
    expect(screen.getByText('Password')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ password: '' }]]);
  });

  it('should get default value', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required defaultValue="foo@bar.com" />);
    expect(screen.getByText('Password')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ password: 'foo@bar.com' }]]);
  });

  it('should validate minLength', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} minLength={3} />);
    expect(screen.getByLabelText('Password')).toBeTruthy();

    await user.type(screen.getByTestId('password'), 'St');
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    await screen.debug(); //?

    expect(
      screen.getByText('Password has a minimum of 3 characters.')
    ).toBeInTheDocument();
  });

  it('should validate maxLength', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} maxLength={5} />);
    expect(screen.getByLabelText('Password')).toBeTruthy();

    await user.type(screen.getByLabelText('Password'), 'Steven');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(
      screen.getByText('Password has a maximum of 5 characters.')
    ).toBeInTheDocument();
  });

  it('should validate min', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} min={3} />);
    expect(screen.getByLabelText('Password')).toBeTruthy();

    await user.type(screen.getByLabelText('Password'), '2');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByText('Password has minimum of 3.')).toBeInTheDocument();
  });

  it('should validate max', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} max={5} />);
    expect(screen.getByLabelText('Password')).toBeTruthy();

    await user.type(screen.getByLabelText('Password'), '6');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByText('Password has maximum of 5.')).toBeInTheDocument();
  });
});
