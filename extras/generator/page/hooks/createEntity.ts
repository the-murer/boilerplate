import { BaseObject } from "@/generator/default";


export function generateCreateHook(obj: BaseObject) {
  const { entity, path, model } = obj;
  const { pascalCase, camelCase, kebabCase } = entity;

  const hook = `
import { Create${pascalCase}Input } from "@/api/${camelCase}/serializers/create${pascalCase}Serializer";
import { pageFetcher } from "@/utils/apiUtils";
import { useMutation } from "@tanstack/react-query";

const create${pascalCase} = async (data: Create${pascalCase}Input) =>
  pageFetcher({ data, endPoint: "api/${kebabCase}", method: "POST" });

export const useCreate${pascalCase} = () => {
  return useMutation({
    mutationFn: create${pascalCase},
  });
};
  `;
return hook
}