import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { parseISO } from 'date-fns';
import Form from '../form/form';
import Date, { DateProps } from './date';

interface AppProps extends Omit<DateProps, 'fieldName' | 'label'> {
  onSubmit: (data: any) => void;
  minDate?: Date;
  maxDate?: Date;
}

const App = ({
  onSubmit,
  required = false,
  disabled = false,
  defaultValue,
  minDate,
  maxDate,
}: AppProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Form onSubmit={onSubmit}>
        <Date
          fieldName="date"
          required={required}
          disabled={disabled}
          label="Date"
          defaultValue={defaultValue}
          minDate={minDate}
          maxDate={maxDate}
        />
      </Form>
    </LocalizationProvider>
  );
};

describe('Input', () => {
  beforeAll(() => {
    // add window.matchMedia
    // this is necessary for the date picker to be rendered in desktop mode.
    // if this is not provided, the mobile mode is rendered, which might lead to unexpected behavior
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: any) => ({
        media: query,
        // this is the media query that @material-ui/pickers uses to determine if a device is a desktop device
        matches: query === '(pointer: fine)',
        onchange: () => { },
        addEventListener: () => { },
        removeEventListener: () => { },
        addListener: () => { },
        removeListener: () => { },
        dispatchEvent: () => false,
      }),
    });
  });

  afterAll(() => {
    delete window.matchMedia;
  });

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

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByText('Date is required.')).toBeInTheDocument();
  });

  it('should submit if required and user has entered data', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(() => { });

    render(<App onSubmit={mockSubmit} required />);
    expect(screen.getByRole('textbox')).toBeTruthy();
    await user.type(
      screen.getByRole('textbox'),
      '[ArrowLeft][ArrowLeft]10102020'
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(mockSubmit).toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
    const date = parseISO('2020-10-10T00:00:00');
    expect(mockSubmit.mock.calls).toEqual([[{ date }]]);
  });

  it('should allow submit if not required', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required={false} />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ date: '' }]]);
  });

  it('should allow submit if input is disabled', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} required disabled />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ date: '' }]]);
  });

  it('should get default value', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(
      <App
        onSubmit={mockSubmit}
        required
        defaultValue={parseISO('2019-09-25')}
      />
    );
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit.mock.calls).toEqual([[{ date: parseISO('2019-09-25') }]]);
  });

  it('should validate minDate', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} minDate={parseISO('2019-09-25')} />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.type(
      screen.getByRole('textbox'),
      '[ArrowLeft][ArrowLeft]10102018'
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(
      screen.getByText(
        'Date must be after Wed Sep 25 2019 00:00:00 GMT-0400 (Eastern Daylight Time).'
      )
    ).toBeInTheDocument();
  });

  it('should validate maxDate', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<App onSubmit={mockSubmit} maxDate={parseISO('2021-09-25')} />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    await user.type(
      screen.getByRole('textbox'),
      '[ArrowLeft][ArrowLeft]10102022'
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(
      screen.getByText(
        'Date must be before Sat Sep 25 2021 00:00:00 GMT-0400 (Eastern Daylight Time).'
      )
    ).toBeInTheDocument();
  });
});
