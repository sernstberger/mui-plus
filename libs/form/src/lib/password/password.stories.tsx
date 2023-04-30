import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Form from '../form/form';
import { Password } from './password';

const Story: ComponentMeta<typeof Password> = {
  component: Password,
  title: 'Password',
};
export default Story;

const Template: ComponentStory<typeof Password> = (args) => (
  <Form onSubmit={() => { }}>
    <Password {...args} />
  </Form>
);

export const Primary = Template.bind({});
Primary.args = {
  fieldName: 'password',
  label: 'Password',
  required: true,
  disabled: false,
  // defaultValue: 0,
  // helperText: 'Helper Text',
};
