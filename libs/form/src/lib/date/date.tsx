import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Control, { ControlProps } from '../control/control';
import { startOfDay } from 'date-fns';
import { date } from 'yup';

export interface DateProps extends Omit<ControlProps, 'children, min, max'> {
  fieldName: string;
  label: React.ReactNode;
  minDate?: Date;
  maxDate?: Date;
}

export function Date({ minDate, maxDate, ...rest }: DateProps) {
  let dateValidation = undefined;
  if (minDate && maxDate) {
    dateValidation = date()
      .min(minDate, `${rest.label} must be after ${minDate}.`)
      .max(maxDate, `${rest.label} must be before ${maxDate}.`);
  } else if (minDate) {
    dateValidation = date().min(
      minDate,
      `${rest.label} must be after ${minDate}.`
    );
  } else if (maxDate) {
    dateValidation = date().max(
      maxDate,
      `${rest.label} must be before ${maxDate}.`
    );
  }

  return (
    <Control {...rest} customValidation={dateValidation}>
      {({
        field,
        fieldState,
        formState,
        label,
        defaultValue,
        helperText,
        required,
      }: any) => {
        return (
          <DatePicker
            {...field}
            onChange={(e: any) => field.onChange(startOfDay(e))}
            defaultValue={defaultValue}
            label={label}
            // disabled={true}
            slotProps={{
              textField: {
                helperText,
                required,
                error: !!fieldState.error,
              },
            }}
          />
        );
      }}
    </Control>
  );
}

export default Date;
