import { BaseObject } from ".";
import { writeFile } from "./utils";
import { generateMainPageFile } from "./page/client/genMainPage";
import { generateRecordPage } from "./page/client/genRecordPage";

function generateInterfaces(obj: BaseObject) {
  const { path } = obj;

  writeFile(generateMainPageFile(obj), `app/${path}/page.tsx`);
  writeFile(generateRecordPage(obj), `app/${path}/[id]/page.tsx`);
}

function generateComponents(obj: BaseObject) {
  const { entity, path } = obj;

  //   writeFile(generateGetByIdSerializer(obj), `api/${path}/serializers/get${entity.pascalCase}ByIdSerializer.ts`);
}

function generateHooks(obj: BaseObject) {
  const { entity, path } = obj;

  //   writeFile(generateGetByIdSerializer(obj), `api/${path}/serializers/get${entity.pascalCase}ByIdSerializer.ts`);
}

export function generatePages(obj: BaseObject) {
  generateInterfaces(obj);
  generateComponents(obj);
  generateHooks(obj);
}
