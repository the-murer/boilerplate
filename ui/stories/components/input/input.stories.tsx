import type { Meta, StoryObj } from "@storybook/react";
import Input from "./input";
import { useForm, UseFormGetValues } from "react-hook-form";

const meta = {
  title: "Components/Input",
  component: Input,
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    type: { control: "text" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

const FieldWrapper = ({ ...args }: any) => {
  const name = "value";
  const form = useForm<UseFormGetValues<any>>({
    mode: "onBlur",
    defaultValues: {
      value: "",
    },
  });

  return (
    <div className="w-500px p-4">
      <Input {...args} name={name} form={form} />
    </div>
  );
};

export const Default: Story = {
  args: {
    label: "Teste",
    placeholder: "Teste",
    type: "text",
    disabled: false,
  } as any,
  render: (args) => (
    <div className="flex flex-col gap-4">
      <FieldWrapper {...args} name={args.name} />
    </div>
  ),
};
