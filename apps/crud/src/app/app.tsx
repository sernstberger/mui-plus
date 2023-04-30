import { Container, Typography } from '@mui/material';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import ProgressBar from './components/ProgressBar';
import Step from './components/Step';

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
        <Route path="step-1" element={<Step />} />
      </Route>
      <Route path="*" element={<div>nope</div>} />
    </Routes>
  );
}

export default App;
