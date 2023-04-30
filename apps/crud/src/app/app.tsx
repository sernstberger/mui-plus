import { Container, Typography } from '@mui/material';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import ProgressBar from './components/ProgressBar';
import Step from './components/Step';
import { Email, Input, Select } from '@mui-plus/form';

const steps = [
  {
    label: 'What is your name?',
    path: 'step-1',
    element: (
      <>
        <Input fieldName="firstName" label="First name" />
        <Input fieldName="lastName" label="Last name" />
      </>
    ),
    previousStep: '/form',
  },
  {
    label: 'Contact info',
    path: 'step-2',
    element: (
      <>
        <Email fieldName="email" label="Email" />
        <Input fieldName="phone" label="Phone" />
      </>
    ),
  },
  {
    label: 'The most important question of all',
    path: 'step-3',
    element: (
      <Select
        fieldName="iceCream"
        label="Ice Cream"
        options={[
          { label: 'Chocolate', value: 'chocolate' },
          { label: 'Vanilla', value: 'vanilla' },
          { label: 'Strawberry', value: 'strawberry' },
        ]}
      />
    ),
    nextStep: '/form/submitted',
  },
];

export function App() {
  const numberOfSteps = steps.length;
  return (
    <Routes>
      <Route index element={<h1>Home</h1>} />
      <Route
        path="form"
        element={
          <Container maxWidth="sm">
            <ProgressBar numberOfSteps={numberOfSteps} />
            <br />

            <Outlet />
          </Container>
        }
      >
        <Route
          index
          element={
            <div>
              <Typography>Let's get started</Typography>
              <Link to="step-1">Step 1</Link>
            </div>
          }
        />
        {steps.map((step, index) => {
          const { path, element, previousStep, nextStep, label } = step;
          const stepNumber = index + 1;
          const _previousStep = previousStep || `/form/step-${stepNumber - 1}`;
          const _nextStep = nextStep || `/form/step-${stepNumber + 1}`;
          return (
            <Route
              key={path}
              path={path}
              element={
                <Step previousStep={_previousStep} nextStep={_nextStep} label={label}>
                  {element}
                </Step>
              }
            />
          );
        })}
      </Route>
      <Route path="*" element={<div>nope</div>} />
    </Routes>
  );
}

export default App;
