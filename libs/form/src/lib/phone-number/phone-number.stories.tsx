import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Form from '../form/form';
import { PhoneNumber } from './phone-number';

const Story: ComponentMeta<typeof PhoneNumber> = {
  component: PhoneNumber,
  title: 'PhoneNumber',
};
export default Story;

const Template: ComponentStory<typeof PhoneNumber> = (args) => (
  <Form onSubmit={() => { }}>
    <PhoneNumber {...args} />
  </Form>
);

export const Primary = Template.bind({});
Primary.args = {
  fieldName: 'phoneNumber',
  label: 'Phone Number',
  required: true,
  disabled: false,
  // defaultValue: 0,
  // helperText: 'Helper Text',
};
