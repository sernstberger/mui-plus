import { TextField } from '@mui/material';
import { PatternFormat } from 'react-number-format';
import Control, { ControlProps } from '../control/control';
import valid from 'card-validator';
import { string } from 'yup';

export interface CreditCardNumberProps extends Omit<ControlProps, 'children'> { }

export function CreditCardNumber({
  prefix,
  label,
  ...rest
}: CreditCardNumberProps) {
  return (
    <Control
      {...rest}
      label={label}
      customValidation={string().test(
        'test-number',
        `${label} is invalid`,
        (value) => valid.number(value).isValid
      )}
    >
      {({
        field,
        fieldState,
        defaultValue,
        label: _label,
        helperText,
      }: any) => {
        return (
          <PatternFormat
            {...field}
            customInput={TextField}
            error={!!fieldState.error}
            defaultValue={defaultValue}
            label={_label}
            helperText={helperText}
            inputProps={{ inputMode: 'numeric' }}
            format="#### #### #### ####"
            allowEmptyFormatting
          // mask="_"
          />
        );
      }}
    </Control>
  );
}

export default CreditCardNumber;
