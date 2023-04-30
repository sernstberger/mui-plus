import { Form } from '@mui-plus/form';
import { Button, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { decrement, increment } from './stepSlice';
import { useNavigate } from 'react-router-dom';

export function Step({ children, nextStep, previousStep }: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Button
        onClick={() => {
          dispatch(decrement());
          navigate(previousStep);
        }}
      >
        Back
      </Button>
      <Form
        onSubmit={() => {
          dispatch(increment());
          navigate(nextStep);
        }}
      >
        {children}
      </Form>
    </Container>
  );
}

export default Step;
