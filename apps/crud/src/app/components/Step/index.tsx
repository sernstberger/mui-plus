import { Form } from '@mui-plus/form';
import { Button, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { decrement, increment } from './stepSlice';

export function Step({ children }: any) {
  const dispatch = useDispatch();

  return (
    <Container maxWidth="sm">
      <Button onClick={() => dispatch(decrement())}>Back</Button>
      <Form onSubmit={() => dispatch(increment())}>{children}</Form>
    </Container>
  );
}

export default Step;
