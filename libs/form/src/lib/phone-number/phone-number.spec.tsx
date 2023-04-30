import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../form/form';
import PhoneNumber, { PhoneNumberProps } from './phone-number';

interface AppProps extends Omit<PhoneNumberProps, 'fieldName' | 'label'> {
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
      <PhoneNumber
        fieldName="number"
        required={required}
        disabled={disabled}
        label="Number"
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

    expect(screen.getByText('Number is required.')).toBeInTheDocument();
  });

  it('should submit if required and user has entered data', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(() => { });

    render(<App onSubmit={mockSubmit} required />);
    expect(screen.getByRole('textbox')).toBeTruthy();
    await user.type(screen.getByLabelText(/number/i), '3178675309');

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();

    expect(mockSubmit.mock.calls).toEqual([[{ number: '(317) 867-5309' }]]);
  });

  it('should allow submit if not required', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required={false} />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ number: '' }]]);
  });

  it('should allow submit if input is disabled', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required disabled />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ number: '' }]]);
  });

  it('should get default value', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required defaultValue={5} />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ number: 5 }]]);
  });


});
