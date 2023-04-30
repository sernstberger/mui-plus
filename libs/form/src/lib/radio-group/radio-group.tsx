import {
  RadioGroup as MuiRadioGroup,
  RadioGroupProps as MuiRadioGroupProps,
  Radio,
  FormLabel,
  FormHelperText,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import Control, { ControlProps } from '../control/control';

interface OptionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  label: string;
}
export interface RadioGroupProps
  extends Omit<
    ControlProps,
    'children' | 'min' | 'max' | 'minLength' | 'maxLength'
  > {
  // fieldName: string;
  // label: React.ReactNode;
  options: OptionProps[];
}

export function RadioGroup({
  fieldName,

  options,
  ...rest
}: RadioGroupProps) {
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
        <FormControl>
          <FormLabel id={`${fieldName}-label`} required={required}>
            {label}
          </FormLabel>

          <MuiRadioGroup
            {...field}
            aria-labelledby={`${fieldName}-label`}
            name={fieldName}
            error={!!fieldState.error}
            defaultValue={defaultValue}
            required={required}
          >
            {options.map((option: OptionProps) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </MuiRadioGroup>

          <FormHelperText error={!!fieldState.error}>
            {helperText}
          </FormHelperText>
        </FormControl>
      )}
    </Control>
  );
}

export default RadioGroup;
