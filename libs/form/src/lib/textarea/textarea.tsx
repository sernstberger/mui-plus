import { TextField } from '@mui/material';
import Control, { ControlProps } from '../control/control';

export interface TextareaProps
  extends Omit<ControlProps, 'children' | 'min' | 'max'> {
  // fieldName: string;
  // label: React.ReactNode;
}

export function Textarea({ fieldName, ...rest }: TextareaProps) {
  return (
    <Control {...rest} fieldName={fieldName}>
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
          multiline
          minRows={3}
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

export default Textarea;
