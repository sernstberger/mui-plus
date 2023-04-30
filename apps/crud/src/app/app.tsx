import {
  Address,
  Checkbox,
  Email,
  Form,
  Input,
  Select,
} from '@mui-plus/form';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import type { RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './components/Step/stepSlice';
import ProgressBar from './components/ProgressBar';

export function App() {
  const count = useSelector((state: RootState) => state.step.value);
  const dispatch = useDispatch();



  return (
    <Routes>
      <Route index element={<h1>Home</h1>} />
      <Route
        path="/form"
        element={
          <Container maxWidth="sm">
            <ProgressBar />
            <br />

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
        }
      />
    </Routes>
  );
}

export default App;
