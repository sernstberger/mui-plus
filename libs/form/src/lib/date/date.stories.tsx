import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { parseISO } from 'date-fns';
import Form from '../form/form';
import { Date } from './date';

const Story: ComponentMeta<typeof Date> = {
  component: Date,
  title: 'Date',
};
export default Story;

const Template: ComponentStory<typeof Date> = (args) => (
  <Form onSubmit={() => { }}>
    <Date {...args} />
  </Form>
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Date',
  fieldName: 'date',
  required: true,
  minDate: parseISO('2019-09-25'),
  maxDate: parseISO('2021-09-25'),
};
