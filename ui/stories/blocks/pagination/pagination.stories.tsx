import type { Meta, StoryObj } from '@storybook/react';
import Pagination from './pagination';

const meta = {
  title: 'Blocks/Pagination',
  component: Pagination,
  argTypes: {
    metadata: { control: 'object' },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    metadata: {
      totalPages: 10,
      currentPage: 1,
      hasNextPage: true,
      hasPreviousPage: false,
      totalEntries: 100,
    },
    onPageChange: () => {},
  },
};
