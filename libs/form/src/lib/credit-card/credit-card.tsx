import Grid from '@mui/material/Grid';
import Input from '../input/input';
import CreditCardExpirationDate from './credit-card-expiration-date';
import CreditCardNumber from './credit-card-number';
import CreditCardSecurityCode from './credit-card-security-code';

export interface CreditCardProps {
  fieldName: string;
  label: React.ReactNode;
  required?: boolean;
}

export function CreditCard({
  fieldName,
  required = false,
  ...rest
}: CreditCardProps) {
  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Input fieldName="nameOnCard" required label="Name on card" />
      </Grid>
      <Grid xs={12}>
        <CreditCardNumber fieldName="cardNumber" required label="Card number" />
      </Grid>

      <Grid xs={6}>
        <CreditCardExpirationDate
          fieldName="expirationDate"
          label="Expiration date"
          required
          format="MM/yyyy"
        />
      </Grid>
      <Grid xs={6}>
        <CreditCardSecurityCode
          fieldName="securityCode"
          required
          label="Security code"
        // maxLength={3}
        // minLength={3}
        />
      </Grid>
    </Grid>
  );
}

export default CreditCard;
