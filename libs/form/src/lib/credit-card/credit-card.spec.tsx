import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../form/form';
import CreditCard, { CreditCardProps } from './credit-card';

interface AppProps extends Omit<CreditCardProps, 'fieldName' | 'label'> {
  onSubmit: (data: any) => void;
}

// TODO: #89 Write tests for CreditCard

const App = ({
  onSubmit,
  required = false,
  disabled = false,
  defaultValue,
}: AppProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>

      <Form onSubmit={onSubmit}>
        <CreditCard
          fieldName="cc"
          required={required}
          disabled={disabled}
          label="CC"
          defaultValue={defaultValue}
        />
      </Form>
    </LocalizationProvider>
  );
};

describe('Input', () => {
  it('should render successfully', () => {
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} />);
    expect(screen.getAllByRole('textbox').length).toBe(4);
  });
  it('should not allow submit if required', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required />);
    expect(screen.getAllByRole('textbox').length).toBe(4);

    await user.click(screen.getByRole('button'));

    expect(screen.getByText('Name on card is required.')).toBeInTheDocument();
    expect(screen.getByText('Card number is required.')).toBeInTheDocument();
    expect(screen.getByText('Expiration date is required.')).toBeInTheDocument();
    expect(screen.getByText('Security code is required.')).toBeInTheDocument();
  });

  it('should submit if required and user has entered data', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(() => { });

    render(<App onSubmit={mockSubmit} required />);
    expect(screen.getAllByRole('textbox').length).toBe(4);
    await user.type(screen.getByLabelText(/Name on card/i), 'Steve Ernstberger');
    await user.type(screen.getByLabelText(/Card number/i), '4111111111111111');
    await user.type(screen.getByLabelText(/Expiration date/i), '122021');
    await user.type(screen.getByLabelText(/Security code/i), '123');

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();

    expect(mockSubmit.mock.calls).toEqual([[{ number: '123' }]]);
  });

  it('should allow submit if not required', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required={false} />);
    expect(screen.getAllByRole('textbox').length).toBe(4);

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ number: undefined }]]);
  });

  it('should allow submit if input is disabled', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required disabled />);
    expect(screen.getAllByRole('textbox').length).toBe(4);

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ number: undefined }]]);
  });

  it('should get default value', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required defaultValue={5} />);
    expect(screen.getAllByRole('textbox').length).toBe(4);

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ number: 5 }]]);
  });
});
