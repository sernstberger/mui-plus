import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Form from '../form/form';
import { CreditCardSecurityCode } from './credit-card-security-code';

const Story: ComponentMeta<typeof CreditCardSecurityCode> = {
  component: CreditCardSecurityCode,
  title: 'CreditCardSecurityCode',
};
export default Story;

const Template: ComponentStory<typeof CreditCardSecurityCode> = (args) => (
  <Form onSubmit={() => { }}>
    <CreditCardSecurityCode {...args} fieldName="ccNumber" />
  </Form>
);

export const Primary = Template.bind({});
Primary.args = {};
