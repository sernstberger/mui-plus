import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Form from '../form/form';
import { CheckboxGroup } from './checkbox-group';

const Story: ComponentMeta<typeof CheckboxGroup> = {
  component: CheckboxGroup,
  title: 'CheckboxGroup',
};
export default Story;

const Template: ComponentStory<typeof CheckboxGroup> = (args) => (
  <Form onSubmit={() => { }}>
    <CheckboxGroup {...args} />
  </Form>
);

export const Primary = Template.bind({});
Primary.args = {
  fieldName: 'checkboxGroup',
  label: 'Checkbox Group',
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
