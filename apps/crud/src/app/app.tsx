import { Form, Input, Select } from '@mui-plus/form';
import { Container } from '@mui/material';

export function App() {
  return (
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
      </Form>
    </Container>
  );
}

export default App;
