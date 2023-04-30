import {
  MenuItem,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  TextField,
} from '@mui/material';
import Control, { ControlProps } from '../control/control';

interface OptionProps {
  value: string | number | object;
  label: string;
}
export interface SelectProps
  extends Omit<
    ControlProps,
    'children' | 'min' | 'max' | 'minLength' | 'maxLength'
  > {
  // fieldName: string;
  // label: React.ReactNode;
  options: OptionProps[];
}

export function Select({
  fieldName,
  options,
  // helperText,
  ...rest
}: SelectProps) {
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
          {...field}
          error={!!fieldState.error}
          defaultValue={defaultValue}
          label={label}
          helperText={helperText}
          required={required}
          select

        // value={value}
        // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        //   onChange(event.target.value);
        // }}
        >
          {options.map((option: OptionProps, index: number) => {
            const foo = typeof option.value === 'object' ? JSON.stringify(option.value) : option.value;
            return (
              <MenuItem key={index} value={foo}>
                {option.label}
              </MenuItem>
            );
          })}
        </TextField>
      )}
    </Control>
  );
}

export default Select;
