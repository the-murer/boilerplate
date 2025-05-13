import type { Meta, StoryObj } from '@storybook/react';
import Collapse from './collapse';

const meta = {
  title: 'Components/Collapse',
  component: Collapse,
  argTypes: {
    isOpen: { control: 'boolean' },
  },
} satisfies Meta<typeof Collapse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    children: <div style={{ padding: '10px', maxWidth: '300px', fontSize: '26px', fontWeight: 'bold' }}>Teste</div>,
  },
  render: (args) => (
    <>
      <Collapse {...args} />
    </>
  ),
};
