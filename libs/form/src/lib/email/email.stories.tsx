import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Form from '../form/form';
import { Email } from './email';

const Story: ComponentMeta<typeof Email> = {
  component: Email,
  title: 'Email',
};
export default Story;

const Template: ComponentStory<typeof Email> = (args) => (
  <Form onSubmit={() => { }}>
    <Email {...args} />
  </Form>
);
export const Primary = Template.bind({});
Primary.args = {
  fieldName: 'email',
  label: 'Email',
  required: true,
  disabled: false,
  // defaultValue: foo@bar.com,
  // helperText: 'Helper Text',
};
