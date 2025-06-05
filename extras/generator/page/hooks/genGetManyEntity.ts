import { BaseObject } from "@/types/generatorTypes";

export function generateGetManyHook(obj: BaseObject) {
  const { entity } = obj;

  const hook = `
import { getQueryString, pageFetcher } from "@/utils/apiUtils";
import { PaginationType } from "@/utils/pagination";
import { useQuery } from "@tanstack/react-query";

const get${entity.pluralPascal()}Key = "${entity.pluralCamel()}";

const get${entity.pluralPascal()} = async ({
  page,
  limit,
  sortField,
  sortOrder,
  ...aditionalParams
}: PaginationType) =>
  pageFetcher({
    endPoint: \`api/${entity.kebabCase()}?\${getQueryString({
      page,
      limit,
      sortField,
      sortOrder,
      ...aditionalParams,
    })}\`,
    method: "GET",
  });

export const useGet${entity.pluralPascal()} = ({
  page,
  limit,
  sortField,
  sortOrder,
  ...aditionalParams
}: PaginationType) => {
  return useQuery({
    queryKey: [get${entity.pluralPascal()}Key, page, limit, sortField, sortOrder, aditionalParams],
    queryFn: () =>
      get${entity.pluralPascal()}({
        page,
        limit,
        sortField,
        sortOrder,
        ...aditionalParams,
      }),
  });
};
  `;
  return hook;
}
