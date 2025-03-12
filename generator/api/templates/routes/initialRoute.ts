import { BaseObject } from "@/generator/default";

export function generateInitialFile(obj: BaseObject) {
  const { entity, path, model } = obj;
  const { pascalCase, camelCase, pluralPascal } = entity;
  const route = `
  import { apiHandler } from "@/utils/apiUtils";
  import { create${pascalCase}Handler } from "@/api/${camelCase}/handlers/create${pascalCase}Handler";
  import { get${pluralPascal}Handler } from "@/api/${camelCase}/handlers/get${pluralPascal}Handler";
  import { validateCreate${pascalCase}Input } from "@/api/${camelCase}/serializers/create${pascalCase}Serializer";
  import { validateGet${pluralPascal}Input } from "@/api/${camelCase}/serializers/get${pluralPascal}Serializer";
  import { extractPaginationParams } from "@/utils/pagination";
  
  export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const paginationParams = extractPaginationParams(searchParams);
  
    // ADITIONAL PARAMS
      ${Object.keys(model)
    .map(
      (field) => `
      const ${field} = searchParams.get("${field}") || "";`
    ).join("\n")}
  
    return apiHandler(
      { ...paginationParams, ${Object.keys(model).join(", ")} },
      validateGet${pluralPascal}Input,
      get${pluralPascal}Handler
    );
  };
  
  export const POST = async (req: Request) =>
    apiHandler(await req.json(), validateCreate${pascalCase}Input, create${pascalCase}Handler);
    `;
  return route;
}
