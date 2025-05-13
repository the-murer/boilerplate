import type { Meta, StoryObj } from '@storybook/react';
import ErrorView from './errorView';

const meta = {
  title: 'Views/ErrorView',
  component: ErrorView,
  argTypes: {
    error: { control: 'text' },
  },
} satisfies Meta<typeof ErrorView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: "Some error message",
  },
};
