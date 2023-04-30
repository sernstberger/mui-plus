import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabel,
  FormHelperText,
  Stack,
} from '@mui/material';
import Control, { ControlProps } from '../control/control';

export interface CheckboxProps
  extends Omit<ControlProps, 'children' | 'min' | 'max'> {
  // fieldName: string;
  // label: React.ReactNode;
}

export function Checkbox({
  fieldName,
  ...rest
}: CheckboxProps) {
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
      }: any) => {
        return (
          <Stack>
            <FormControlLabel
              control={
                <MuiCheckbox
                  {...field}
                  //  checked={checked}
                  checked={!!field.value}
                  defaultChecked={defaultValue}
                  // required={required}
                  name={fieldName}
                />
              }
              label={label}
            />
            <FormHelperText error={!!fieldState.error}>
              {helperText}
            </FormHelperText>
          </Stack>
        );
      }}
    </Control>
  );
}

export default Checkbox;
