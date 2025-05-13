import type { Meta, StoryObj } from '@storybook/react';
import NotFoundView from './notFoundView';

const meta = {
  title: 'Views/NotFoundView',
  component: NotFoundView,
} satisfies Meta<typeof NotFoundView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: "Não foi possível encontrar o recurso",
  },
};
