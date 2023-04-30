import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Address } from './address';
import Form from '../form/form';

const Story: ComponentMeta<typeof Address> = {
  component: Address,
  title: 'Address',
};
export default Story;

const Template: ComponentStory<typeof Address> = (args) => (
  <Form onSubmit={() => { }}>
    <Address {...args} />
  </Form>
);

export const Primary = Template.bind({});
Primary.args = {
  fieldName: 'address',
};
