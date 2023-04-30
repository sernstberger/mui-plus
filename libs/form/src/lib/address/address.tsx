import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Input, Select } from '@mui-form/components';
import State from './state';
import ZipCode from './zip-code';

export const Address = ({ fieldName }: any) => {
  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Input fieldName={`${fieldName}-streetAddress`} required label="Street address" />
      </Grid>
      <Grid xs={12}>
        <Input
          fieldName={`${fieldName}-line2`}
          // required
          label="Apt, suite, unit, building, floor, etc."
        />
      </Grid>
      <Grid xs={6}>
        <Input fieldName={`${fieldName}-city`} required label="City" />
      </Grid>
      <Grid xs={3}>
        <State fieldName={`${fieldName}-state`} />
      </Grid>
      <Grid xs={3}>
        <ZipCode fieldName={`${fieldName}-zip`} required label="Zip code" />
      </Grid>
    </Grid>
  );
};

export default Address;
