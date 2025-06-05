import fs from "fs";
import { BaseObject } from "@/types/generatorTypes";
import { generateCreateSerializer } from "./templates/serializers/createSerializer";
import { generateUpdateSerializer } from "./templates/serializers/updateSerializer";
import { generateDeleteSerializer } from "./templates/serializers/deleteSerializer";
import { generateGetSerializer } from "./templates/serializers/paginatedSerializer";
import { generateGetByIdSerializer } from "./templates/serializers/getSerializer";
import { generateCreateHandler } from "./templates/handlers/createHandler";
import { generateUpdateHandler } from "./templates/handlers/updateHandler";
import { generateDeleteHandler } from "./templates/handlers/deleteHandler";
import { generateGetByIdHandler } from "./templates/handlers/paginatedHandler";
import { generateGetHandler } from "./templates/handlers/getHandler";
import { generateIdFile } from "./templates/routes/idRoute";
import { generateInitialFile } from "./templates/routes/initialRoute";
import { writeFile } from "../utils";

function generateApiRoutes(obj: BaseObject) {
  const { entity } = obj;

  writeFile(generateInitialFile(obj), `app/api/${entity.kebabCase()}/route.ts`);
  writeFile(generateIdFile(obj), `app/api/${entity.kebabCase()}/[id]/route.ts`);
}

function generateApiSerializers(obj: BaseObject) {
  const { entity } = obj;

  writeFile(
    generateCreateSerializer(obj),
    `api/${entity.camelCase()}/serializers/create${entity.pascalCase()}Serializer.ts`
  );
  writeFile(
    generateUpdateSerializer(obj),
    `api/${entity.camelCase()}/serializers/update${entity.pascalCase()}Serializer.ts`
  );
  writeFile(
    generateDeleteSerializer(obj),
    `api/${entity.camelCase()}/serializers/delete${entity.pascalCase()}Serializer.ts`
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
    `api/${entity.camelCase()}/handlers/update${entity.pascalCase()}Handler.ts`
  );
  writeFile(
    generateDeleteHandler(obj),
    `api/${entity.camelCase()}/handlers/delete${entity.pascalCase()}Handler.ts`
  );
  writeFile(
    generateGetHandler(obj),
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
