import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../form/form';
import Checkbox, { CheckboxProps } from './checkbox';

interface AppProps extends Omit<CheckboxProps, 'fieldName' | 'label'> {
  onSubmit: (data: any) => void;
}

const App = ({
  onSubmit = () => { },
  required = false,
  disabled = false,
  defaultChecked = false,
}: AppProps) => {
  return (
    <Form onSubmit={onSubmit}>
      <Checkbox
        fieldName="checkbox"
        required={required}
        disabled={disabled}
        label="Checkbox"
        defaultChecked={defaultChecked}
      />
    </Form>
  );
};

describe('Input', () => {
  it('should render successfully', () => {
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} />);
    expect(screen.getByRole('checkbox')).toBeTruthy();
  });
  it('should not allow submit if required', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required />);
    expect(screen.getByRole('checkbox')).toBeTruthy();

    await user.click(screen.getByRole('button'));

    expect(screen.getByText('Checkbox is required.')).toBeInTheDocument();
  });

  it('should submit if required and user has clicked the checkbox', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(() => { });

    render(<App onSubmit={mockSubmit} required />);
    expect(screen.getByRole('checkbox')).toBeTruthy();
    await user.click(screen.getByLabelText(/Checkbox/i));

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ checkbox: true }]]);
  });

  it('should allow submit if not required', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required={false} />);
    expect(screen.getByRole('checkbox')).toBeTruthy();

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ checkbox: '' }]]);
  });

  it('should allow submit if input is disabled', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required disabled />);
    expect(screen.getByRole('checkbox')).toBeTruthy();

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ checkbox: '' }]]);
  });

  it('should get defaultChecked value', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required defaultChecked />);
    expect(screen.getByRole('checkbox')).toBeTruthy();

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ checkbox: true }]]);
  });

  it('should get defaultChecked value and allow the user to change it', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(() => { });

    render(<App onSubmit={mockSubmit} required defaultChecked />);

    expect(screen.getByRole('checkbox')).toBeTruthy();

    await user.click(screen.getByRole('checkbox')); // uncheck the box
    expect(console.error).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button'));

    expect(mockSubmit).not.toHaveBeenCalled();

    await user.click(screen.getByRole('checkbox')); // check the box again
    await user.click(screen.getByRole('button'));

    expect(console.error).not.toHaveBeenCalled();
    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ checkbox: true }]]);
  });
});
