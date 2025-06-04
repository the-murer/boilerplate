import { BaseObject } from "@/generator/default";

export function generateUpdateHook(obj: BaseObject) {
  const { entity } = obj;
  const { pascalCase, camelCase, kebabCase } = entity;

  const hook = `
import { Update${pascalCase}ByIdInput } from "@/api/${camelCase}/serializers/update${pascalCase}ByIdSerializer";
import { pageFetcher } from "@/utils/apiUtils";
import { useMutation } from "@tanstack/react-query";

const update${pascalCase} = async ({ ${camelCase}Id, ...data }: Update${pascalCase}ByIdInput) =>
  pageFetcher({ data, endPoint: \`api/${kebabCase}/\${${camelCase}Id}\`, method: "PUT" });

export const useUpdate${pascalCase} = () => {
  return useMutation({
    mutationFn: update${pascalCase},
  });
};

  `;
  return hook;
}
