import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Form from '../form/form';
import { State } from './state';

const Story: ComponentMeta<typeof State> = {
  component: State,
  title: 'State',
};
export default Story;

const Template: ComponentStory<typeof State> = (args) => (
  <Form onSubmit={() => { }}>
    <State {...args} />
  </Form>
);

export const Primary = Template.bind({});
Primary.args = {};
