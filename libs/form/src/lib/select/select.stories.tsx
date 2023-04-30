import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Form from '../form/form';
import { Select } from './select';

const Story: ComponentMeta<typeof Select> = {
  component: Select,
  title: 'Select',
};
export default Story;

const Template: ComponentStory<typeof Select> = (args) => (
  <Form onSubmit={() => { }}>
    <Select {...args} />
  </Form>
);

export const Primary = Template.bind({});
Primary.args = {
  fieldName: 'select',
  label: 'Select',
  required: true,
  disabled: false,
  options: [
    { value: '1', label: 'One' },
    { value: '2', label: 'Two' },
    { value: '3', label: 'Three' },
  ],
  // defaultValue: 0,
  // helperText: 'Helper Text',
};
