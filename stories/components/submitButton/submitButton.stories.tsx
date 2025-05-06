import type { Meta, StoryObj } from '@storybook/react';
import SubmitButton from './submitButton';

const meta = {
  title: 'Components/SubmitButton',
  component: SubmitButton,
  argTypes: {
    isPending: { control: 'boolean' },
  },
} satisfies Meta<typeof SubmitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isPending: false,
    handleFormSubmit: () => {},
  },
};
