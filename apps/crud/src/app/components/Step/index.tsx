import { Address, Checkbox, Email, Form, Input, Select } from '@mui-plus/form';
import { Container } from '@mui/material';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { decrement, increment } from './stepSlice';

export function Step() {
  const count = useSelector((state: RootState) => state.step.value);
  const dispatch = useDispatch();

  return (

    <Container maxWidth="sm">
      <Form onSubmit={() => { }}>
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

        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </Form>
    </Container>

  );
}

export default Step;
