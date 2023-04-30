import { Button, Container, Typography } from '@mui/material';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import ProgressBar from './components/ProgressBar';
import Step from './components/Step';
import { Email, Form, Input, Select } from '@mui-plus/form';
import React from 'react';

interface StepProps {
  label: string;
  element: JSX.Element;
  previousStep?: string;
  nextStep?: string;
  path?: string;
}

const steps: StepProps[] = [
  {
    label: 'What is your name?',
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
    element: (
      <>
        <Email fieldName="email" label="Email" />
        <Input fieldName="phone" label="Phone" />
      </>
    ),
  },
  {
    label: 'The most important question of all',
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
              <Button component={Link} to="all">All-in-one</Button>
              <Button component={Link} to="step-1">Wizard</Button>
            </div>
          }
        />

        {/* All-in-one form */}
        <Route
          path="all"
          element={
            <Form onSubmit={() => { }}>
              {steps.map((step, index) => {
                return (
                  <React.Fragment key={step.label}>
                    {step.element}
                  </React.Fragment>
                );
              })}
            </Form>
          }
        />

        {/* Wizard routes */}
        {steps.map((step, index) => {
          const { path, element, previousStep, nextStep, label } = step;
          const stepNumber = index + 1;
          const _path = path || `step-${stepNumber}`;
          const _previousStep = previousStep || `/form/step-${stepNumber - 1}`;
          const _nextStep = nextStep || `/form/step-${stepNumber + 1}`;
          return (
            <Route
              key={_path}
              path={_path}
              element={
                <Step
                  previousStep={_previousStep}
                  nextStep={_nextStep}
                  label={label}
                  stepNumber={stepNumber}
                >
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
