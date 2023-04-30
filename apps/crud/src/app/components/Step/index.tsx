import { Form } from '@mui-plus/form';
import { Button, Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setCurrentStep } from './stepSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function Step({
  children,
  nextStep,
  previousStep,
  label,
  stepNumber,
}: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCurrentStep(stepNumber));
  }, [dispatch, stepNumber]);

  return (
    <Container maxWidth="sm">
      <Button
        onClick={() => {
          navigate(previousStep);
        }}
      >
        Back
      </Button>
      <Typography variant="h4">{label}</Typography>
      <Form
        onSubmit={() => {
          navigate(nextStep);
        }}
      >
        {children}
      </Form>
    </Container>
  );
}

export default Step;
