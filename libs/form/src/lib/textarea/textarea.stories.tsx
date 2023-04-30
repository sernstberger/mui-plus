import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Form from '../form/form';
import { Textarea } from './textarea';

const Story: ComponentMeta<typeof Textarea> = {
  component: Textarea,
  title: 'Textarea',
};
export default Story;

const Template: ComponentStory<typeof Textarea> = (args) => (
  <Form onSubmit={() => { }}>
    <Textarea {...args} />
  </Form>
);

export const Primary = Template.bind({});
Primary.args = {
  fieldName: 'textarea',
  label: 'Textarea',
  required: true,
  disabled: false,
  // defaultValue: 0,
  // helperText: 'Helper Text',
};
