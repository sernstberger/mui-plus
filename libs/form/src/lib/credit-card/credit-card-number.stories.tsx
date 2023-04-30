import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Form from '../form/form';
import { CreditCardNumber } from './credit-card-number';

const Story: ComponentMeta<typeof CreditCardNumber> = {
  component: CreditCardNumber,
  title: 'CreditCardNumber',
};
export default Story;

const Template: ComponentStory<typeof CreditCardNumber> = (args) => (
  <Form onSubmit={() => { }}>
    <CreditCardNumber {...args} />
  </Form>
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Credit Card Number',
  required: true,
  fieldName: 'ccNumber',
  disabled: false,
  defaultValue: ''
};
