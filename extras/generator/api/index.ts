import fs from "fs";
import { BaseObject } from "@/types/generatorTypes";
import { generateCreateHandler } from "./templates/handlers/genCreateHandler";
import { generateUpdateHandler } from "./templates/handlers/genUpdateHandler";
import { generateDeleteHandler } from "./templates/handlers/genDeleteHandler";
import { generateGetByIdHandler } from "./templates/handlers/genGetByIdHandler";
import { generateGetPaginatedHandler } from "./templates/handlers/genGetPaginatedHandler";
import { generateParamRoute } from "./templates/routes/genParamRoute";
import { generateMainRoute } from "./templates/routes/genMainRoute";
import { writeFile } from "../utils";

function generateApiRoutes(obj: BaseObject) {
  const { entity } = obj;

  writeFile(generateMainRoute(obj), `app/api/${entity.kebabCase()}/route.ts`);
  writeFile(
    generateParamRoute(obj),
    `app/api/${entity.kebabCase()}/[id]/route.ts`
  );
}

function generateApiHandlers(obj: BaseObject) {
  const { entity } = obj;

  writeFile(
    generateCreateHandler(obj),
    `api/${entity.camelCase()}/handlers/create${entity.pascalCase()}Handler.ts`
  );
  writeFile(
    generateUpdateHandler(obj),
    `api/${entity.camelCase()}/handlers/update${entity.pascalCase()}ByIdHandler.ts`
  );
  writeFile(
    generateDeleteHandler(obj),
    `api/${entity.camelCase()}/handlers/delete${entity.pascalCase()}ByIdHandler.ts`
  );
  writeFile(
    generateGetPaginatedHandler(obj),
    `api/${entity.camelCase()}/handlers/get${entity.pluralPascal()}PaginatedHandler.ts`
  );
  writeFile(
    generateGetByIdHandler(obj),
    `api/${entity.camelCase()}/handlers/get${entity.pascalCase()}ByIdHandler.ts`
  );
}

export function generateApi(obj: BaseObject) {
  generateApiRoutes(obj);
  generateApiHandlers(obj);
}
