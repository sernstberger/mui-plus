import {
  Address,
  Autocomplete,
  Checkbox,
  CheckboxGroup,
  Date,
  Email,
  Form,
  Input,
  Select,
} from '@mui-plus/form';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <Routes>
      <Route index element={<h1>Home</h1>} />
      <Route
        path="/form"
        element={
          <Container maxWidth="sm">
            <Form onSubmit={() => { }}>
              <Input fieldName="firstName" label="First name" />
              <Input fieldName="lastName" label="Last name" />
              <Select
                fieldName="iceCream"
                label="Ice Cream"
                options={[
                  { label: 'Chocolate', value: 'chocolate' },
                  { label: 'Vanilla', value: 'vanilla' },
                  { label: 'Strawberry', value: 'strawberry' },
                ]}
              />
              <Address fieldName="address" />
              <Autocomplete
                fieldName="movie"
                label="Favorite movie"
                options={[
                  {
                    label: 'Star Wars',
                    value: 'star-wars',
                  },
                  {
                    label: 'Star Trek',
                    value: 'star-trek',
                  },
                  {
                    label: 'Super Troopers',
                    value: 'super-troopers',
                  },
                ]}
              />
              <Checkbox
                fieldName="terms"
                label="I agree to the terms and conditions"
              />
              <CheckboxGroup
                fieldName="colors"
                label="Favorite colors"
                options={[
                  {
                    label: 'Red',
                    value: 'red',
                  },
                  {
                    label: 'Green',
                    value: 'green',
                  },
                  {
                    label: 'Blue',
                    value: 'blue',
                  },
                ]}
              />
              {/* <Date fieldName="birthday" label="Birthday" /> */}
              <Email fieldName="email" label="Email" />
            </Form>
          </Container>
        }
      />
    </Routes>
  );
}

export default App;
