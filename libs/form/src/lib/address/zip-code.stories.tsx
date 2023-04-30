import { Container } from '@mui/material';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Form from '../form/form';
import { ZipCode } from './zip-code';

const Story: ComponentMeta<typeof ZipCode> = {
  component: ZipCode,
  title: 'ZipCode',
};
export default Story;

const Template: ComponentStory<typeof ZipCode> = (args) => (
  <Container maxWidth="sm">
    <Form onSubmit={() => { }}>
      <ZipCode {...args} />
    </Form>
  </Container>
);

export const Primary = Template.bind({});
Primary.args = {
  fieldName: 'zip',
  required: true,
  label: 'Zip code',
  defaultValue: '12345',
  disabled: true,
};
