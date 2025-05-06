import type { Meta, StoryObj } from "@storybook/react";

import RegisterViewHeader from "./registerViewHeader";
import RegisterViewInfoCard from "./registerViewInfoCard";

const meta = {
  title: "Views/RegisterView",
  component: RegisterViewHeader,
} satisfies Meta<typeof RegisterViewHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Cadastro",
    subtitle: "Cadastre-se para continuar",
    openEditModal: () => {},
  },
  render: (args) => (
    <>
      <RegisterViewHeader {...args} />
      <RegisterViewInfoCard
        info={[
          {
            label: "Nome",
            value: "John Doe",
          },
          {
            label: "Email",
            value: "john.doe@example.com",
          },
        ]}
      />
    </>
  ),
};
