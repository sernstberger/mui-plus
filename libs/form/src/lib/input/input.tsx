import { TextField } from '@mui/material';
import Control, { ControlProps } from '../control/control';

export interface InputProps
  extends Omit<
    ControlProps,
    'children' | 'min' | 'max' | 'minDate' | 'maxDate'
  > { }

export function Input(props: InputProps) {
  return (
    <Control {...props}>
      {({
        field,
        fieldState,
        formState,
        label,
        helperText,
        required,
        disabled,
      }: any) => {
        return (
          <TextField
            {...field}
            error={!!fieldState.error}
            {...{ disabled, required, helperText, label }}
          />
        );
      }}
    </Control>
  );
}

export default Input;
