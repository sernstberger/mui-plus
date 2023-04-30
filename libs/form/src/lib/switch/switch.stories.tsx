import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Form from '../form/form';
import { Switch } from './switch';

const Story: ComponentMeta<typeof Switch> = {
  component: Switch,
  title: 'Switch',
};
export default Story;

const Template: ComponentStory<typeof Switch> = (args) => (
  <Form onSubmit={() => { }}>
    <Switch {...args} fieldName="switch" />
  </Form>
);

export const Primary = Template.bind({});
Primary.args = {};
