import { TextField } from '@mui/material';
import { string } from 'yup';
import Control, { ControlProps } from '../control/control';

export interface EmailProps extends Omit<ControlProps, 'children'> { }

export function Email({ fieldName, ...rest }: EmailProps) {
  return (
    <Control
      {...rest}
      fieldName={fieldName}
      customValidation={string().email(
        `${rest.label} must be a valid email address.`
      )}
    >
      {({
        field,
        fieldState,
        formState,
        label,
        defaultValue,
        helperText,
        required,
      }: any) => (
        <TextField
          {...field}
          error={!!fieldState.error}
          defaultValue={defaultValue}
          label={label}
          helperText={helperText}
          required={required}
        />
      )}
    </Control>
  );
}

export default Email;
