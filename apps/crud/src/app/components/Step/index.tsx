import { Form } from '@mui-plus/form';
import { Button, Container, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep } from './stepSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setData } from '../../dataSlice';
// import { RootState } from '../../store';

export function Step({
  children,
  nextStep,
  previousStep,
  label,
  stepNumber,
}: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const data = useSelector((state: RootState) => state.data.data);

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
        onSubmit={(data) => {
          dispatch(setData(data))
          navigate(nextStep);
        }}
      // defaultValues={data}
      >
        {children}
      </Form>
    </Container>
  );
}

export default Step;
