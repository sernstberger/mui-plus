import {
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps,
  FormControlLabel,
  FormHelperText,
  Stack,
} from '@mui/material';
import Control, { ControlProps } from '../control/control';

export interface SwitchProps
  extends Omit<ControlProps, 'children' | 'min' | 'max'> {
  // fieldName: string;
  // label: React.ReactNode;
}

export function Switch({ fieldName, disabled, ...rest }: SwitchProps) {
  return (
    <Control {...rest} fieldName={fieldName} disabled={disabled}>
      {({
        field,
        fieldState,
        formState,
        label,
        defaultValue,
        helperText,
        required,
      }: any) => (
        <Stack>
          <FormControlLabel
            disabled={disabled}
            control={
              <MuiSwitch
                {...field}
                //  checked={checked}
                checked={!!field.value}
                defaultChecked={defaultValue}
                // defaultChecked={defaultValue || false}
                // checked={!!field.value || false}
                // required={required}
                name={fieldName}
              // disabled
              />
            }
            label={label}
          />
          <FormHelperText error={!!fieldState.error}>
            {helperText}
          </FormHelperText>
        </Stack>
      )}
    </Control>
  );
}

export default Switch;
