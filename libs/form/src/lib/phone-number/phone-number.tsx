import { Phone } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { PatternFormat } from 'react-number-format';
import Control, { ControlProps } from '../control/control';

export interface PhoneNumberProps extends Omit<ControlProps, 'children'> {
  // fieldName: string;
  // label: React.ReactNode;
}

export function PhoneNumber({
  fieldName,
  prefix,
  ...rest
}: PhoneNumberProps) {
  return (
    <Control {...rest} fieldName={fieldName}>
      {({
        field,
        fieldState,
        formState,
        label,
        defaultValue,
        helperText,
      }: any) => (
        <PatternFormat
          customInput={TextField}
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          name={field.name}
          inputProps={{ inputMode: 'numeric' }}
          format="(###) ###-####"
          // allowEmptyFormatting
          // mask="_"
          // onChange={(e) => onChange(e.target.valueAsNumber)}

          error={!!fieldState.error}
          defaultValue={defaultValue}
          label={label}
          helperText={helperText}

        // InputProps={{
        //   startAdornment: (
        //     <InputAdornment position="start">
        //       <Phone />
        //     </InputAdornment>
        //   ),
        // }}
        />
      )}
    </Control>
  );
}

export default PhoneNumber;
