import { BaseObject } from "@/types/generatorTypes";

export function generateParamRoute(obj: BaseObject) {
  const { entity } = obj;

  const route = `
 import { RequestHeaders } from "@/types/commandHandler";
import { apiHandler } from "@/utils/apiUtils";

import { delete${entity.pascalCase()}ByIdHandler } from "@/api/${entity.camelCase()}/handlers/delete${entity.pascalCase()}ByIdHandler";
import { get${entity.pascalCase()}ByIdHandler } from "@/api/${entity.camelCase()}/handlers/get${entity.pascalCase()}ByIdHandler";
import { update${entity.pascalCase()}ByIdHandler } from "@/api/${entity.camelCase()}/handlers/update${entity.pascalCase()}ByIdHandler";
import { validateDelete${entity.pascalCase()}ByIdInput } from "@/api/${entity.camelCase()}/serializers/delete${entity.pascalCase()}ByIdSerializer";
import { validateGet${entity.pascalCase()}ByIdInput } from "@/api/${entity.camelCase()}/serializers/get${entity.pascalCase()}ByIdSerializer";
import { validateUpdate${entity.pascalCase()}ByIdInput } from "@/api/${entity.camelCase()}/serializers/update${entity.pascalCase()}ByIdSerializer";

export const GET = async (_: Request, { params }: RequestHeaders) =>{
  const { id } = await params

  return apiHandler(
    { ${entity.camelCase()}Id: id },
    validateGet${entity.pascalCase()}ByIdInput,
    get${entity.pascalCase()}ByIdHandler
  );
}

export const PATCH = async (req: Request, { params }: RequestHeaders) =>
  apiHandler(
    { ...(await req.json()), ${entity.camelCase()}Id: params.id },
    validateUpdate${entity.pascalCase()}ByIdInput,
    update${entity.pascalCase()}ByIdHandler
  );

export const DELETE = async (_: Request, { params }: RequestHeaders) =>
  apiHandler(
    { ${entity.camelCase()}Id: params.id },
    validateDelete${entity.pascalCase()}ByIdInput,
    delete${entity.pascalCase()}ByIdHandler
  );
    `;
  return route;
}
