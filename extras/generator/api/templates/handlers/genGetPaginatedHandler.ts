import { mapObjectFields } from "@/extras/generator/utils";
import { BaseObject } from "@/types/generatorTypes";


export function generateGetPaginatedHandler(obj: BaseObject) {
  const { entity, model } = obj;

  const handler = `
  import { PaginationType, SortEnum } from "@/utils/pagination";
  import dbConnect from "@/database/dbConnect";

import { Get${entity.pluralPascal()}PaginatedHandler as Handler } from "@/api/${entity.camelCase()}/serializers/get${entity.pascalCase()}sSerializer";
import { find${entity.pluralPascal()}WithPagination } from "@/database/repository/${entity.camelCase()}Repository";
import { ${entity.camelCase()}Schema } from "@/types/${entity.camelCase()}Types";


export const get${entity.pluralPascal()}PaginatedHandler: Handler = async ({
  page,
  limit,
  sortField,
  sortOrder,
  ${mapObjectFields(model, (key) => `${key},`).join("\n  ")}
}) => {
  await dbConnect();

  const { ${entity.pluralCamel()}, metadata } = await find${entity.pluralPascal()}WithPagination({
    page,
    limit,
    sortField: sortField || "createdAt",
    sortOrder: sortOrder || SortEnum.DESC,
    ${mapObjectFields(model, (key) => `${key},`).join("\n  ")}
  });

  return { success: true, ${entity.pluralCamel()}, metadata };
};

  `;
  return handler;
}
