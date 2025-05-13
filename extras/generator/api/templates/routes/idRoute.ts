import { BaseObject } from "@/generator/default";

export function generateIdFile(obj: BaseObject) {
  const { entity, path, model } = obj;
  const { pascalCase, camelCase } = entity;

  const route = `
       import { RequestHeaders } from "@/types/commandHandler";
  import { apiHandler } from "@/utils/apiUtils";
  import { delete${pascalCase}ByIdHandler } from "@/api/${camelCase}/handlers/delete${pascalCase}ByIdHandler";
  import { get${pascalCase}ByIdHandler } from "@/api/${camelCase}/handlers/get${pascalCase}ByIdHandler";
  import { update${pascalCase}ByIdHandler } from "@/api/${camelCase}/handlers/update${pascalCase}ByIdHandler";
  import { validateDelete${pascalCase}ByIdInput } from "@/api/${camelCase}/serializers/delete${pascalCase}ByIdSerializer";
  import { validateGet${pascalCase}ByIdInput } from "@/api/${camelCase}/serializers/get${pascalCase}ByIdSerializer";
  import { validateUpdate${pascalCase}ByIdInput } from "@/api/${camelCase}/serializers/update${pascalCase}ByIdSerializer";
  
  export const GET = async (_: Request, { params }: RequestHeaders) =>
    apiHandler(
      { ${camelCase}Id: params.id },
      validateGet${pascalCase}ByIdInput,
      get${pascalCase}ByIdHandler
    );
  
  export const PATCH = async (req: Request, { params }: RequestHeaders) =>
    apiHandler(
      { ...(await req.json()), ${camelCase}Id: params.id },
      validateUpdate${pascalCase}ByIdInput,
      update${pascalCase}ByIdHandler
    );
  
  export const DELETE = async (_: Request, { params }: RequestHeaders) =>
    apiHandler(
      { ${camelCase}Id: params.id },
      validateDelete${pascalCase}ByIdInput,
      delete${pascalCase}ByIdHandler
    );
  
    
      `;
  return route;
}
