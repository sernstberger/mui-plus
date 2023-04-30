import { Form } from '@mui-plus/form';
import { Button, Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { decrement, increment } from './stepSlice';
import { useNavigate } from 'react-router-dom';

export function Step({ children, nextStep, previousStep, label }: any) {
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
      <Typography variant="h4">{label}</Typography>
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
