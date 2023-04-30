import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Form from '../form/form';
import { CreditCard } from './credit-card';

const Story: ComponentMeta<typeof CreditCard> = {
  component: CreditCard,
  title: 'CreditCard',
};
export default Story;

const Template: ComponentStory<typeof CreditCard> = (args) => (
  <Form onSubmit={() => { }}>
    <CreditCard {...args} fieldName="cc" />
  </Form>
);

export const Primary = Template.bind({});
Primary.args = {};
