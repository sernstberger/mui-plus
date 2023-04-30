import { Controller } from 'react-hook-form';
import { InputProps as MuiInputProps, TextField } from '@mui/material';
import { AnySchema } from 'yup';
import rules from '../control/rules';
import { NumericFormat } from 'react-number-format';

export interface NumberInputProps extends MuiInputProps {
  fieldName: string;
  label: React.ReactNode;
  helperText?: React.ReactNode;
  min?: number;
  max?: number;
  customValidation?: AnySchema;
  // showLabel?: boolean;
}

export function NumberInput({
  fieldName,
  required = false,
  disabled,
  label,
  defaultValue = '',
  helperText,
  min,
  max,
  customValidation,
  prefix,
}: NumberInputProps) {
  return (
    <Controller
      name={fieldName}
      defaultValue={defaultValue}
      rules={rules({
        label,
        min,
        max,
        disabled,
        required,
        customValidation,
      })}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState, // { invalid, isTouched, isDirty, error },
        formState, // {isDirty, dirtyFields, touchedFields, defaultValues, isSubmitted, isSubmitSuccessful, isSubmitting, isLoading, submitCount, isValid, isValidating, errors}
      }) => {
        const transform = (e: any) => {
          const output = parseInt(e.target.value.replace(/\$|,/g, ''), 10); // remove $ and , - but should $ only be in the money input, instead?
          // const output = parseInt(e.target.value.replace(/,/g, ''), 10);
          return isNaN(output) ? 0 : output;
        };

        return (
          <NumericFormat
            customInput={TextField}
            onChange={(e) => onChange(transform(e))}
            {...{
              onBlur,
              value,
              name,
              // ref // removed ref because it was causing a console error
            }}
            // value={transform.input(field.value)}
            error={!!fieldState.error}
            // defaultValue={defaultValue}
            label={label}
            helperText={
              fieldState.error ? fieldState.error.message : helperText
            }
            required={required}
            inputProps={{ inputMode: 'numeric' }}
            // inputProps={{ inputMode: 'decimal' }}
            thousandSeparator=","
            prefix={prefix}
          />
        );
      }}
    />
  );
}

export default NumberInput;
