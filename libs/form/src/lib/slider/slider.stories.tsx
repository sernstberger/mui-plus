import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Form from '../form/form';
import { Slider } from './slider';

const Story: ComponentMeta<typeof Slider> = {
  component: Slider,
  title: 'Slider',
};
export default Story;

const Template: ComponentStory<typeof Slider> = (args) => (
  <Form onSubmit={() => { }}>
    <Slider {...args} fieldName="slider" />
  </Form>
);

export const Primary = Template.bind({});
Primary.args = {};
