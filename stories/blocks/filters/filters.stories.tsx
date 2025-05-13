import type { Meta, StoryObj } from '@storybook/react';
import Filters from './filters';

const meta = {
  title: 'Blocks/Filters',
  component: Filters,
} satisfies Meta<typeof Filters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    aditionalParams: {},
    setAditionalParams: () => {},
    children: <div>Teste</div>,
  },
};
