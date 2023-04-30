import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Form from '../form/form';
import { CreditCardExpirationDate } from './credit-card-expiration-date';

const Story: ComponentMeta<typeof CreditCardExpirationDate> = {
  component: CreditCardExpirationDate,
  title: 'CreditCardExpirationDate',
};
export default Story;

const Template: ComponentStory<typeof CreditCardExpirationDate> = (args) => (
  <Form onSubmit={() => { }}>
    <CreditCardExpirationDate {...args} fieldName="ccExpiration" />
  </Form>

);

export const Primary = Template.bind({});
Primary.args = {};
