import { BaseObject } from "../..";

export function generateListFilters({ entity, model }: BaseObject) {
  const page = `
import Filters from "@/ui/stories/blocks/filters/filters";
import Input from "@/ui/stories/components/input/input";
import useUrlParams from "@/modules/layout/hooks/usePaginationParams";
import { useForm } from "react-hook-form";

const ${entity.pascalCase()}Filters = () => {
  const { aditionalParams, setAditionalParams } = useUrlParams();

  const form = useForm({
    defaultValues: aditionalParams,
  });

  return (
    <Filters
      aditionalParams={aditionalParams}
      setAditionalParams={setAditionalParams}
    >
    ${Object.entries(model)
      .map(
        ([key, value]) => `
      <Filters.Row>
        <Input
        form={form}
        label="${key}"
        placeholder="Digite o ${key} do ${entity.pascalCase()}"
        name="${key}"
        type="${value}"
        />
      </Filters.Row>`
      )
      .join("\n  ")}
    </Filters>
  );
};

export default ${entity.pascalCase()}Filters;
`;

  return page;
}
