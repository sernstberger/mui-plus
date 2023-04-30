import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../form/form';
import Money, { MoneyProps } from './money';

interface AppProps extends Omit<MoneyProps, 'fieldName' | 'label'> {
  onSubmit: (data: any) => void;
}

const App = ({
  onSubmit,
  required = false,
  disabled = false,
  defaultValue,
  min,
  max,
}: AppProps) => {
  return (
    <Form onSubmit={onSubmit}>
      <Money
        fieldName="money"
        required={required}
        disabled={disabled}
        label="Money"
        defaultValue={defaultValue}
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

    expect(screen.getByText('Money is required.')).toBeInTheDocument();
  });

  it('should submit if required and user has entered data', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(() => { });

    render(<App onSubmit={mockSubmit} required />);
    expect(screen.getByRole('textbox')).toBeTruthy();
    await user.type(screen.getByLabelText(/money/i), '123');

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();


    expect(mockSubmit.mock.calls).toEqual([[{ money: 123 }]]);
  });

  it('should allow submit if not required', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required={false} />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ money: '' }]]);
  });

  it('should allow submit if input is disabled', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required disabled />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ money: '' }]]);
  });

  it('should get default value', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required defaultValue={5} />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ money: 5 }]]);
  });

  it('should validate min', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} min={3} />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.type(screen.getByRole('textbox'), '2');
    await user.click(screen.getByRole('button'));
    // this fails because of the dollar sign
    expect(screen.getByText('Money has minimum of 3.')).toBeInTheDocument();
  });

  it('should validate max', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} max={5} />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.type(screen.getByRole('textbox'), '6');
    await user.click(screen.getByRole('button'));
    // this fails because of the dollar sign
    expect(screen.getByText('Money has maximum of 5.')).toBeInTheDocument();
  });
});
