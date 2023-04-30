import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Form from '../form/form';
import { NumberInput } from './number-input';

const Story: ComponentMeta<typeof NumberInput> = {
  component: NumberInput,
  title: 'NumberInput',
};
export default Story;

const Template: ComponentStory<typeof NumberInput> = (args) => (
  <Form onSubmit={() => { }}>
    <NumberInput {...args} />
  </Form>
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Number Input',
  required: true,
  fieldName: 'numberInput',
  disabled: false,
  // defaultValue: ''
};
