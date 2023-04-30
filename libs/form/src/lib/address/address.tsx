import { Grid } from '@mui/material';
import State from './state';
import ZipCode from './zip-code';
import Input from '../input/input';

export const Address = ({ fieldName, required }: any) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Input fieldName={`${fieldName}-streetAddress`} required={required} label="Street address" />
      </Grid>
      <Grid item xs={12}>
        <Input
          fieldName={`${fieldName}-line2`}
          // required
          label="Apt, suite, unit, building, floor, etc."
        />
      </Grid>
      <Grid item xs={6}>
        <Input fieldName={`${fieldName}-city`} required={required} label="City" />
      </Grid>
      <Grid item xs={3}>
        <State fieldName={`${fieldName}-state`} required={required} />
      </Grid>
      <Grid item xs={3}>
        <ZipCode fieldName={`${fieldName}-zip`} required={required} label="Zip code" />
      </Grid>
    </Grid>
  );
};

export default Address;
