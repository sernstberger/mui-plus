import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../form/form';
import CheckboxGroup, { CheckboxGroupProps } from './checkbox-group';

interface AppProps
  extends Omit<CheckboxGroupProps, 'fieldName' | 'label' | 'options'> {
  onSubmit: (data: any) => void;
}

const App = ({
  onSubmit,
  required = false,
  disabled = false,
  defaultChecked,
}: AppProps) => {
  return (
    <Form onSubmit={onSubmit}>
      <CheckboxGroup
        fieldName="checkbox"
        required={required}
        disabled={disabled}
        label="Checkbox group"
        defaultChecked={defaultChecked}
        options={[
          { value: 'dog', label: 'Dog' },
          { value: 'cat', label: 'Cat' },
          { value: 'bird', label: 'Bird' },
          { value: 'fish', label: 'Fish' },
          { value: 'snake', label: 'Snake' },
        ]}
      />
    </Form>
  );
};

describe('Input', () => {
  it('should render successfully', () => {
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} />);
    // expect(screen.getByRole('checkbox')).toBeTruthy();
  });
  it('should not allow submit if required', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required />);
    // expect(screen.getByRole('checkbox')).toBeTruthy();

    await user.click(screen.getByRole('button'));

    expect(screen.getByText('Checkbox group is required.')).toBeInTheDocument();
  });

  // it('should submit if required and user has entered data', async () => {
  //   const user = userEvent.setup();
  //   const mockSubmit = jest.fn();
  //   render(<App onSubmit={mockSubmit} required />);
  //   // expect(screen.getByRole('checkbox')).toBeTruthy();
  //   await user.click(screen.getByLabelText(/Checkbox group/i));

  //   await user.click(screen.getByRole('button'));

  //   expect(mockSubmit).toHaveBeenCalled();
  //   expect(mockSubmit.mock.calls).toEqual([[{ checkbox: true }]]);
  // });

  it('should allow submit if not required', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required={false} />);
    // expect(screen.getByRole('checkbox')).toBeTruthy();

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ checkbox: undefined }]]);
  });

  it('should allow submit if input is disabled', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required disabled />);
    // expect(screen.getByRole('checkbox')).toBeTruthy();

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ checkbox: undefined }]]);
  });

  it('should get defaultChecked value', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required defaultChecked />);
    // expect(screen.getByRole('checkbox')).toBeTruthy();

    await user.click(screen.getByRole('button'));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ checkbox: true }]]);
  });
});
