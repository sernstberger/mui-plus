import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Form from '../form/form';
import { Input } from './input';

const Story: ComponentMeta<typeof Input> = {
  component: Input,
  title: 'Input',
};
export default Story;

const Template: ComponentStory<typeof Input> = (args) => (
  <Form onSubmit={() => { }}>
    <Input {...args} fieldName="input" />
  </Form>
);

export const Primary = Template.bind({});
Primary.args = {
  required: true,
  label: 'Input',
  defaultValue: 'Steve',
  disabled: false,
};
