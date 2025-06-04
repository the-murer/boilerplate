import { BaseObject } from ".";
import { writeFile } from "./utils";
import { generateMainPageFile } from "./page/client/genMainPage";
import { generateRecordPage } from "./page/client/genRecordPage";
import { generateCreateModal } from "./page/components/genCreateModal";
import { generateUpdateModal } from "./page/components/genUpdateModal";
import { generateDeleteModal } from "./page/components/genDeleteModal";
import { generateEntityForm } from "./page/components/genEntityForm";
import { generateListFilters } from "./page/components/genListFilters";

function generateInterfaces(obj: BaseObject) {
  const { entity } = obj;

  writeFile(generateRecordPage(obj), `app/${entity}/[id]/page.tsx`);
  writeFile(generateMainPageFile(obj), `app/${entity}/page.tsx`);
}

function generateComponents(obj: BaseObject) {
  const { entity } = obj;

  writeFile(generateCreateModal(obj), `app/${entity}/components/create${entity.pascalCase()}Modal.tsx`);
  writeFile(generateUpdateModal(obj), `app/${entity}/components/update${entity.pascalCase()}Modal.tsx`);
  writeFile(generateDeleteModal(obj), `app/${entity}/components/delete${entity.pascalCase()}Modal.tsx`);
  writeFile(generateEntityForm(obj), `app/${entity}/components/${entity.camelCase()}Form.tsx`);
  writeFile(generateListFilters(obj), `app/${entity}/components/${entity.camelCase()}Filters.tsx`);
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
