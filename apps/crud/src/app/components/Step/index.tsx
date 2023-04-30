import { Address, Checkbox, Email, Form, Input, Select } from '@mui-plus/form';
import { Button, Container } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { decrement, increment } from './stepSlice';

export function Step() {
  const count = useSelector((state: RootState) => state.step.value);
  const dispatch = useDispatch();

  return (
    <Container maxWidth="sm">
      <Button onClick={() => dispatch(decrement())}>Back</Button>
      <Form onSubmit={() => dispatch(increment())}>
        <Input fieldName="firstName" label="First name" />
        <Input fieldName="lastName" label="Last name" />
        <Select
          fieldName="iceCream"
          label="Ice Cream"
          options={[
            { label: 'Chocolate', value: 'chocolate' },
            { label: 'Vanilla', value: 'vanilla' },
            { label: 'Strawberry', value: 'strawberry' },
          ]}
        />
        <Address fieldName="address" />
        <Checkbox
          fieldName="terms"
          label="I agree to the terms and conditions"
        />
        <Email fieldName="email" label="Email" />

        {/* <Button variant="contained" onClick={}>
          Next
        </Button> */}
      </Form>
    </Container>
  );
}

export default Step;
