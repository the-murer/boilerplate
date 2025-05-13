import { BaseObject } from "@/generator/default";

export function generateDeleteHook(obj: BaseObject) {
  const { entity } = obj;
  const { pascalCase, camelCase, kebabCase } = entity;

  const hook = `
import { Delete${pascalCase}ByIdInput } from "@/api/${camelCase}/serializers/delete${pascalCase}ByIdSerializer";
import { pageFetcher } from "@/utils/apiUtils";
import { useMutation } from "@tanstack/react-query";

const delete${pascalCase} = async ({ ${camelCase}Id }: Delete${pascalCase}ByIdInput) =>
  pageFetcher({
    endPoint: \`api/${kebabCase}/\${${camelCase}Id}\`,
    method: "DELETE",
  });

export const useDelete${pascalCase} = () => {
  return useMutation({
    mutationFn: delete${pascalCase},
  });
};

  `;
  return hook
}