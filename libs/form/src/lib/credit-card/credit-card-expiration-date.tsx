import Control, { ControlProps } from '../control/control';
import { DateField } from '@mui/x-date-pickers';
import { useFormContext } from 'react-hook-form';
import { startOfMonth } from 'date-fns';

export interface CreditCardExpirationDateProps
  extends Omit<ControlProps, 'children'> {
  format?: string;
}

export function CreditCardExpirationDate({
  fieldName,
  format,
  ...rest
}: CreditCardExpirationDateProps) {
  const methods = useFormContext();

  return (
    <Control {...rest} fieldName={fieldName}>
      {({ field, error, defaultValue, label, helperText, required }: any) => (
        <DateField
          // {...field}
          onChange={(newValue: any) => field.onChange(startOfMonth(newValue))}
          onBlur={field.onBlur}
          // value={field.value}
          name={field.name}
          ref={field.ref}
          label={label}
          format={format}
          // error={true}
          required={required}
          // onError={(newValue) => console.log('!!!', newValue)}
          onError={(newValue) =>
            methods.setError(fieldName, { type: 'manual', message: 'newValue' })
          }
          helperText={helperText}
        />
      )}
    </Control>
  );
}

export default CreditCardExpirationDate;
