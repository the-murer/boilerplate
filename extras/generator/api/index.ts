import fs from "fs";
import { BaseObject } from "@/types/generatorTypes";
import { generateCreateSerializer } from "./templates/serializers/genCreateSerializer";
import { generateUpdateSerializer } from "./templates/serializers/genUpdateSerializer";
import { generateDeleteSerializer } from "./templates/serializers/genDeleteSerializer";
import { generateGetSerializer } from "./templates/serializers/genGetPaginatedSerializer";
import { generateGetByIdSerializer } from "./templates/serializers/genGetByIdSerializer";
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
  writeFile(generateParamRoute(obj), `app/api/${entity.kebabCase()}/[id]/route.ts`);
}

function generateApiSerializers(obj: BaseObject) {
  const { entity } = obj;

  writeFile(
    generateCreateSerializer(obj),
    `api/${entity.camelCase()}/serializers/create${entity.pascalCase()}Serializer.ts`
  );
  writeFile(
    generateUpdateSerializer(obj),
    `api/${entity.camelCase()}/serializers/update${entity.pascalCase()}ByIdSerializer.ts`
  );
  writeFile(
    generateDeleteSerializer(obj),
    `api/${entity.camelCase()}/serializers/delete${entity.pascalCase()}ByIdSerializer.ts`
  );
  writeFile(
    generateGetSerializer(obj),
    `api/${entity.camelCase()}/serializers/get${entity.pascalCase()}Serializer.ts`
  );
  writeFile(
    generateGetByIdSerializer(obj),
    `api/${entity.camelCase()}/serializers/get${entity.pascalCase()}ByIdSerializer.ts`
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
    `api/${entity.camelCase()}/handlers/get${entity.pascalCase()}Handler.ts`
  );
  writeFile(
    generateGetByIdHandler(obj),
    `api/${entity.camelCase()}/handlers/get${entity.pascalCase()}ByIdHandler.ts`
  );
}

export function generateApi(obj: BaseObject) {
  generateApiRoutes(obj);
  generateApiSerializers(obj);
  generateApiHandlers(obj);
}
