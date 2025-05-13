import type { Meta, StoryObj } from '@storybook/react';
import LoadingView from './loadingView';

const meta = {
  title: 'Views/LoadingView',
  component: LoadingView,
} satisfies Meta<typeof LoadingView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};
