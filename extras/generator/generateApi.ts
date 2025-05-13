import fs from 'fs';
import { BaseObject } from './default';
import { generateCreateSerializer } from './api/templates/serializers/createSerializer';
import { generateUpdateSerializer } from './api/templates/serializers/updateSerializer';
import { generateDeleteSerializer } from './api/templates/serializers/deleteSerializer';
import { generateGetSerializer } from './api/templates/serializers/paginatedSerializer';
import { generateGetByIdSerializer } from './api/templates/serializers/getSerializer';
import { generateCreateHandler } from './api/templates/handlers/createHandler';
import { generateUpdateHandler } from './api/templates/handlers/updateHandler';
import { generateDeleteHandler } from './api/templates/handlers/deleteHandler';
import { generateGetHandler } from './api/generateHandlers';
import { generateGetByIdHandler } from './api/templates/handlers/paginatedHandler';
import { generateIdFile } from './api/templates/routes/idRoute';
import { generateInitialFile } from './api/templates/routes/initialRoute';

function writeFile(content: string, pathName: string) {
  fs.writeFileSync(pathName, content);
  process.exit();
}

export function generateApi(obj: BaseObject) {
  generateApiRoutes(obj);
  generateApiSerializers(obj);
  generateApiHandlers(obj);
}

function generateApiRoutes(obj: BaseObject) {
  const { entity, path, model } = obj;

  writeFile(generateInitialFile(obj), `app/api/${path}/route.ts`);
  writeFile(generateIdFile(obj), `app/api/${path}/[id]/route.ts`);
}

function generateApiSerializers(obj: BaseObject) {
  const { entity, path } = obj;

  writeFile(generateCreateSerializer(obj), `api/${path}/serializers/create${entity.pascalCase}Serializer.ts`);
  writeFile(generateUpdateSerializer(obj), `api/${path}/serializers/update${entity.pascalCase}Serializer.ts`);
  writeFile(generateDeleteSerializer(obj), `api/${path}/serializers/delete${entity.pascalCase}Serializer.ts`);
  writeFile(generateGetSerializer(obj), `api/${path}/serializers/get${entity.pascalCase}Serializer.ts`);
  writeFile(generateGetByIdSerializer(obj), `api/${path}/serializers/get${entity.pascalCase}ByIdSerializer.ts`);
}


function generateApiHandlers(obj: BaseObject) {
  const { entity, path } = obj;

  writeFile(generateCreateHandler(obj), `api/${path}/handlers/create${entity.pascalCase}Handler.ts`);
  writeFile(generateUpdateHandler(obj), `api/${path}/handlers/update${entity.pascalCase}Handler.ts`);
  writeFile(generateDeleteHandler(obj), `api/${path}/handlers/delete${entity.pascalCase}Handler.ts`);
  writeFile(generateGetHandler(obj), `api/${path}/handlers/get${entity.pascalCase}Handler.ts`);
  writeFile(generateGetByIdHandler(obj), `api/${path}/handlers/get${entity.pascalCase}ByIdHandler.ts`);
}


