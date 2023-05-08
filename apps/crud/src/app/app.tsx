import { Button, Container, Typography } from '@mui/material';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import ProgressBar from './components/ProgressBar';
import Step from './components/Step';
import { Email, Form, Input, Select } from '@mui-plus/form';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';

interface StepProps {
  label: string;
  element: JSX.Element;
  previousStep?: string;
  nextStep?: string;
  path?: string;
}



export function App() {
  const data = useSelector((state: RootState) => state.data.data);
  const steps: StepProps[] = [
    {
      label: 'What is your name?',
      element: (
        <>
          <Input fieldName="firstName" label="First name" defaultValue={data.firstName} />
          <Input fieldName="lastName" label="Last name" defaultValue={data.lastName} />
        </>
      ),
      previousStep: '/form',
    },
    {
      label: 'Contact info',
      element: (
        <>
          <Email fieldName="email" label="Email" defaultValue={data.email} />
          <Input fieldName="phone" label="Phone" type='tel' defaultValue={data.phone} />
          {/* <input defaultValue={data.phone} /> */}
        </>
      ),
    },
    {
      label: 'The most important question of all',
      element: (
        <>
          <Select
            fieldName="iceCream"
            label="Ice Cream"
            options={[
              { label: 'Chocolate', value: 'chocolate' },
              { label: 'Vanilla', value: 'vanilla' },
              { label: 'Strawberry', value: 'strawberry' },
            ]}
          />
          <Input fieldName="freeForm" label="Freeform" />
        </>
      ),
      nextStep: '/form/submitted',
    },
  ];

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
