import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Form from '../form/form';
import { RadioGroup } from './radio-group';

const Story: ComponentMeta<typeof RadioGroup> = {
  component: RadioGroup,
  title: 'RadioGroup',
};
export default Story;

const Template: ComponentStory<typeof RadioGroup> = (args) => (
  <Form onSubmit={() => { }}>
    <RadioGroup {...args} fieldName="radioGroup" />
  </Form>
);

export const Primary = Template.bind({});
Primary.args = {};
