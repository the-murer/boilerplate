import { BaseObject } from "@/generator/default";

export function generateGetManyHook(obj: BaseObject) {
  const { entity, path, model } = obj;
  const { pascalCase, camelCase, kebabCase, pluralPascal } = entity;

  const hook = `
import { getQueryString, pageFetcher } from "@/utils/apiUtils";
import { PaginationType } from "@/utils/pagination";
import { useQuery } from "@tanstack/react-query";


const get${pluralPascal} = async ({
  page,
  limit,
  sortField,
  sortOrder,
  ...aditionalParams
}: PaginationType) =>
  pageFetcher({
    endPoint: \`api/${kebabCase}?\${getQueryString({
      page,
      limit,
      sortField,
      sortOrder,
      ...aditionalParams,
    })}\`,
    method: "GET",
  });

export const useGet${pluralPascal} = ({
  page,
  limit,
  sortField,
  sortOrder,
  ...aditionalParams
}: PaginationType) => {
  return useQuery({
    queryKey: ["${pluralPascal}", page, limit, sortField, sortOrder, aditionalParams],
    queryFn: () =>
      get${pluralPascal}({ page, limit, sortField, sortOrder, ...aditionalParams }),
  });
};

  `;
  return hook;
}
