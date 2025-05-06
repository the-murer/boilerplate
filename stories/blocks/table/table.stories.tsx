import type { Meta, StoryObj } from '@storybook/react';
import Table from './table';
import { SortEnum } from '@/utils/pagination';

const meta = {
  title: 'Blocks/Table',
  component: Table,
  argTypes: {
    columns: { control: 'object' },
    data: { control: 'object' },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    columns: [
      {
        id: 'name',
        header: 'Name',
        accessorKey: 'name',
      },
    ],
    data: [],
    onSortChange: () => {},
    sortField: '',
    sortOrder: SortEnum.ASC,
    isLoading: false,
    limit: 10,
    error: null,
  },
};

export const Default: Story = {
  args: {
    ...Empty.args,
    data: [
      {
        id: 1,
        name: 'John Doe',
      },
      {
        id: 2,
        name: 'Jane Doe',
      },
    ],
  },
};

export const Loading: Story = {
  args: {
    ...Empty.args,
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    ...Empty.args,
    error: "Some error message",
  },
};
