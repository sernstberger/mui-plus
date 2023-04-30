import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Form from '../form/form';
import { Money } from './money';

const Story: ComponentMeta<typeof Money> = {
  component: Money,
  title: 'Money',
};
export default Story;

const Template: ComponentStory<typeof Money> = (args) =>
  <Form onSubmit={() => { }}>
    <Money {...args} />
  </Form>

export const Primary = Template.bind({});
Primary.args = {
  fieldName: 'money',
  label: 'Money',
  required: true,
  disabled: false,
  // defaultValue: 0,
  // helperText: 'Helper Text',

};
