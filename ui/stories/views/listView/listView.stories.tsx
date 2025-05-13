import type { Meta, StoryObj } from "@storybook/react";

import PageHeader from "@/ui/stories/blocks/pageHeader/pageHeader";
import { PencilIcon } from "lucide-react";
import Table from "@/ui/stories/blocks/table/table";
import Pagination from "@/ui/stories/blocks/pagination/pagination";
import Filters from "@/ui/stories/blocks/filters/filters";
import Input from "@/ui/stories/components/input/input";
import { useForm } from "react-hook-form";
import { SortEnum } from "@/utils/pagination";

const meta = {
  title: "Views/ListView",
  argTypes: {
    showAddButton: { control: "boolean" },
    showData: { control: "boolean" },
    showFilter: { control: "boolean" },
    isLoading: { control: "boolean" },
    customError: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const data = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
  },
  {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "User",
  },
];

const columns = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Cargo",
  },
];

const DefaultFilters = () => {
  const form = useForm();
  return (
    <Filters aditionalParams={{}} setAditionalParams={() => {}}>
      <Filters.Row>
        <Filters.Column>
          <Input form={form} label="Nome" placeholder="Nome" name="name" />
        </Filters.Column>
        <Filters.Column>
          <Input form={form} label="Email" placeholder="Email" name="email" />
        </Filters.Column>
      </Filters.Row>
    </Filters>
  );
};

export const Default: Story = {
  args: {
    title: "Cadastro",
    subtitle: "Cadastre-se para continuar",
    showAddButton: true,
    showData: true,
    showFilter: true,
    isLoading: false,
    customError: "",
  } as any,
  render: (args: any) => (
    <>
      <PageHeader
        title={args.title}
        subtitle={args.subtitle}
        openAddModal={args.showAddButton ? () => {} : undefined}
        filterComponent={args.showFilter ? <DefaultFilters /> : undefined}
      />

      <Table
        columns={columns}
        data={args.showData ? data : []}
        onSortChange={() => {}}
        sortField={"name"}
        sortOrder={SortEnum.ASC}
        isLoading={args.isLoading}
        error={args.customError}
        limit={10}
      />
      <Pagination
        metadata={{
          totalPages: 2,
          currentPage: 1,
          hasNextPage: true,
          hasPreviousPage: false,
          totalEntries: 20,
        }}
        onPageChange={() => {}}
      />
    </>
  ),
};
