import { Container, Typography } from '@mui/material';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import ProgressBar from './components/ProgressBar';
import Step from './components/Step';
import { Email, Input, Select } from '@mui-plus/form';

export function App() {
  return (
    <Routes>
      <Route index element={<h1>Home</h1>} />
      <Route
        path="form"
        element={
          <Container maxWidth="sm">
            <ProgressBar />
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
        <Route
          path="step-1"
          element={
            <Step previousStep="/form" nextStep="/form/step-2">
              <Input fieldName="firstName" label="First name" />
              <Input fieldName="lastName" label="Last name" />
            </Step>
          }
        />
        <Route
          path="step-2"
          element={
            <Step previousStep="/form/step-1" nextStep="/form/step-3" >
              <Select
                fieldName="iceCream"
                label="Ice Cream"
                options={[
                  { label: 'Chocolate', value: 'chocolate' },
                  { label: 'Vanilla', value: 'vanilla' },
                  { label: 'Strawberry', value: 'strawberry' },
                ]}
              />
            </Step>
          }
        />
        <Route
          path="step-3"
          element={
            <Step previousStep="/form/step-2" nextStep="/form/submitted">
              <Email fieldName="email" label="Email" />
            </Step>
          }
        />
      </Route>
      <Route path="*" element={<div>nope</div>} />
    </Routes>
  );
}

export default App;
