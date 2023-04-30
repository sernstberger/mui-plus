import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Form from '../form/form';
import { Autocomplete } from './autocomplete';

const Story: ComponentMeta<typeof Autocomplete> = {
  component: Autocomplete,
  title: 'Autocomplete',
};
export default Story;

const Template: ComponentStory<typeof Autocomplete> = (args) => (
  <Form onSubmit={() => { }}>
    <Autocomplete {...args} />
  </Form>
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Autocomplete',
  options: [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'bird', label: 'Bird' },
  ],
  fieldName: 'autocomplete',
  required: true,
  // defaultValue: 'dog',
};
