import type { Meta, StoryObj } from '@storybook/react';
import PageHeader from './pageHeader';

const meta = {
  title: 'Blocks/PageHeader',
  component: PageHeader,
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Teste',
    subtitle: 'Teste',
  },
  render: (args) => (
    <>
      <PageHeader {...args} />
    </>
  ),
};
