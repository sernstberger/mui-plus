import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Form } from './form';

const Story: ComponentMeta<typeof Form> = {
  component: Form,
  title: 'Form',
};
export default Story;

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
