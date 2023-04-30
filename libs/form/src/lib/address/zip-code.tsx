import { TextField } from '@mui/material';
import { PatternFormat } from 'react-number-format';
import Control, { ControlProps } from '../control/control';

export interface ZipCodeProps extends Omit<ControlProps, 'children'> {
  // fieldName: string;
  // label: React.ReactNode;
}

export function ZipCode({
  fieldName,
  required = false,
  prefix,
  ...rest
}: ZipCodeProps) {
  return (
    <Control {...rest} fieldName={fieldName} required={required}>
      {({ error, defaultValue, label, onChange, helperText, disabled }: any) => (
        <PatternFormat
          customInput={TextField}
          error={!!error}
          defaultValue={defaultValue}
          label={label}
          helperText={helperText}
          inputProps={{ inputMode: 'numeric' }}
          format="#####"
          allowEmptyFormatting
          // mask="_"
          disabled={disabled}
          onChange={(e) => onChange(e.target.valueAsNumber)}
        />
      )}
    </Control>
  );
}

export default ZipCode;
