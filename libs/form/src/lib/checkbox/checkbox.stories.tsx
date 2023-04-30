import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Form from '../form/form';
import { Checkbox } from './checkbox';

const Story: ComponentMeta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Checkbox',
};
export default Story;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Form onSubmit={() => { }}>
    <Checkbox {...args} />
  </Form>
);

export const Primary = Template.bind({});
Primary.args = {
  fieldName: 'checkbox',
  label: 'Checkbox',
  required: true,
  disabled: false,
  // defaultValue: 0,
  // helperText: 'Helper Text',
};
