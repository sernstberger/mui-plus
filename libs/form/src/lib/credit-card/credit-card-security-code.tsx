import { TextField } from '@mui/material';
import { PatternFormat } from 'react-number-format';
import Control, { ControlProps } from '../control/control';

export interface CreditCardSecurityCodeProps
  extends Omit<ControlProps, 'children'> { }

export function CreditCardSecurityCode({
  prefix,
  ...rest
}: CreditCardSecurityCodeProps) {
  return (
    <Control {...rest}>
      {({ field, fieldState, defaultValue, label, helperText }: any) => (
        <PatternFormat
          {...field}
          customInput={TextField}
          error={!!fieldState.error}
          defaultValue={defaultValue}
          label={label}
          helperText={helperText}
          inputProps={{ inputMode: 'numeric' }}
          format="###"
          allowEmptyFormatting
          onChange={(e) => field.onChange(e.target.valueAsNumber)}
        />
      )}
    </Control>
  );
}

export default CreditCardSecurityCode;
