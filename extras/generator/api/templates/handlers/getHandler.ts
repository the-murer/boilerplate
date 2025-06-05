import { mapObjectFields } from "@/extras/generator/utils";
import { BaseObject } from "@/types/generatorTypes";


export function generateGetHandler(obj: BaseObject) {
  const { entity, model } = obj;
  const { pascalCase, camelCase } = entity;

  const handler = `
  import { PaginationType, SortEnum } from "@/utils/pagination";
  import dbConnect from "@/database/dbConnect";

import { Get${pascalCase}sHandler as Handler } from "@/api/${camelCase}/serializers/get${pascalCase}sSerializer";
import { find${pascalCase}sWithPagination } from "@/database/repository/${camelCase}Repository";
import { ${camelCase}Schema } from "@/types/${camelCase}Types";

const sanitized${pascalCase}Schema = ${camelCase}Schema.omit({ password: true });

export const get${pascalCase}sHandler: Handler = async ({
  page,
  limit,
  sortField,
  sortOrder,
  ${mapObjectFields(model, (key) => `${key},`).join("\n  ")}
}) => {
  await dbConnect();

  const { ${camelCase}s, metadata } = await find${pascalCase}sWithPagination({
    page,
    limit,
    sortField: sortField || "createdAt",
    sortOrder: sortOrder || SortEnum.DESC,
    ${mapObjectFields(model, (key) => `${key},`).join("\n  ")}
  });

  const data = ${camelCase}s.map((${camelCase}) => sanitized${pascalCase}Schema.parse(${camelCase}));

  return { success: true, ${camelCase}s: data, metadata };
};

  `;
  return handler;
}
