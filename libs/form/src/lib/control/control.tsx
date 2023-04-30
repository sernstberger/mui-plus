import { Controller } from 'react-hook-form';
import { InputProps as MuiInputProps } from '@mui/material';
import { AnySchema } from 'yup';
import rules from './rules';

export interface ControlProps extends MuiInputProps {
  fieldName: string;
  children: any; // not React.ReactNode
  label: React.ReactNode;
  helperText?: React.ReactNode;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  customValidation?: any; // TODO: #88 customValidation should be a Yup schema
  // showLabel?: boolean;
}

export function Control({
  fieldName,
  required = false,
  disabled,
  children,
  label,
  defaultValue,
  defaultChecked = false,
  helperText,
  minLength,
  maxLength,
  min,
  max,
  customValidation,
}: ControlProps) {
  return (
    <Controller
      name={fieldName}
      defaultValue={defaultChecked || defaultValue || ''}
      rules={rules({
        label,
        minLength,
        maxLength,
        min,
        max,
        disabled,
        required,
        customValidation,
      })}
      render={({
        field, // { onChange, onBlur, value, name, ref },
        fieldState, // { invalid, isTouched, isDirty, error },
        formState, // {isDirty, dirtyFields, touchedFields, defaultValues, isSubmitted, isSubmitSuccessful, isSubmitting, isLoading, submitCount, isValid, isValidating, errors}
      }) =>
        children({
          field,
          fieldState,
          formState,
          label,
          defaultValue, // can I take this out? shouldn't this be in the value (in field)?
          required,
          helperText: fieldState.error ? fieldState.error.message : helperText,
          disabled: disabled || formState.isSubmitting,
        })
      }
    />
  );
}

export default Control;
