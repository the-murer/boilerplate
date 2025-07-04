import { mapObjectFields } from "@/extras/generator/utils";
import { BaseObject } from "@/types/generatorTypes";

export function generateMainRoute(obj: BaseObject) {
  const { entity, model } = obj;

  const route = `
import { apiHandler } from "@/utils/apiUtils";
import { extractPaginationParams } from "@/utils/pagination";

import { create${entity.pascalCase()}Handler } from "@/api/${entity.camelCase()}/handlers/create${entity.pascalCase()}Handler";
import { validateCreate${entity.pascalCase()}Input } from "@/api/${entity.camelCase()}/serializers/create${entity.pascalCase()}Serializer";
import { get${entity.pluralPascal()}PaginatedHandler } from "@/api/${entity.camelCase()}/handlers/get${entity.pluralPascal()}PaginatedHandler";
import { validateGet${entity.pluralPascal()}PaginatedInput } from "@/api/${entity.camelCase()}/serializers/get${entity.pluralPascal()}PaginatedSerializer";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const paginationParams = extractPaginationParams(searchParams);

  // ADITIONAL PARAMS
  ${mapObjectFields(model, (key) => `const ${key}: searchParams.get("${key}") || "";`)
    .join("\n  ")}

  return apiHandler(
    { ...paginationParams, ${mapObjectFields(model, (key) => `${key},`)
      .join("\n  ")} },
    validateGet${entity.pluralPascal()}PaginatedInput,
    get${entity.pluralPascal()}PaginatedHandler
    );
};

export const POST = async (req: Request) =>
  apiHandler(await req.json(), validateCreate${entity.pascalCase()}Input, create${entity.pascalCase()}Handler);
`;
  return route;
}
