import type { Meta, StoryObj } from "@storybook/react";

import RegisterViewHeader from "./registerViewHeader";
import RegisterViewInfoCard from "./registerViewInfoCard";
import PageHeader from "@/stories/blocks/pageHeader/pageHeader";
import { PencilIcon } from "lucide-react";

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
      <PageHeader {...args}>
        <PageHeader.Button onPress={() => {}}>
          <PencilIcon className="w-5 h-5" />
        </PageHeader.Button>
      </PageHeader>
      <RegisterViewInfoCard
        {...args}
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
