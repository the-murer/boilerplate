import { BaseObject } from "..";
import { writeFile } from "../utils";
import { generateMainPageFile } from "./client/genMainPage";
import { generateRecordPage } from "./client/genRecordPage";
import { generateCreateModal } from "./components/genCreateModal";
import { generateUpdateModal } from "./components/genUpdateModal";
import { generateDeleteModal } from "./components/genDeleteModal";
import { generateEntityForm } from "./components/genEntityForm";
import { generateListFilters } from "./components/genListFilters";
import { generateGetHook } from "./hooks/genGetEntity";
import { generateGetManyHook } from "./hooks/genGetManyEntity";
import { generateCreateHook } from "./hooks/genCreateEntity";
import { generateUpdateHook } from "./hooks/genUpdateEntity";
import { generateDeleteHook } from "./hooks/genDeleteEntity";

function generateInterfaces(obj: BaseObject) {
  const { entity } = obj;

  writeFile(generateRecordPage(obj), `app/${entity}/[id]/page.tsx`);
  writeFile(generateMainPageFile(obj), `app/${entity}/page.tsx`);
}

function generateComponents(obj: BaseObject) {
  const { entity } = obj;

  writeFile(
    generateCreateModal(obj),
    `app/${entity}/components/create${entity.pascalCase()}Modal.tsx`
  );
  writeFile(
    generateUpdateModal(obj),
    `app/${entity}/components/update${entity.pascalCase()}Modal.tsx`
  );
  writeFile(
    generateDeleteModal(obj),
    `app/${entity}/components/delete${entity.pascalCase()}Modal.tsx`
  );
  writeFile(
    generateEntityForm(obj),
    `app/${entity}/components/${entity.camelCase()}Form.tsx`
  );
  writeFile(
    generateListFilters(obj),
    `app/${entity}/components/${entity.camelCase()}Filters.tsx`
  );
}

function generateHooks(obj: BaseObject) {
  const { entity } = obj;

  writeFile(
    generateGetHook(obj),
    `app/${entity}/hooks/useGet${entity.pascalCase()}.ts`
  );
  writeFile(
    generateGetManyHook(obj),
    `app/${entity}/hooks/useGet${entity.pluralPascal()}.ts`
  );
  writeFile(
    generateCreateHook(obj),
    `app/${entity}/hooks/useCreate${entity.pascalCase()}.ts`
  );
  writeFile(
    generateUpdateHook(obj),
    `app/${entity}/hooks/useUpdate${entity.pascalCase()}.ts`
  );
  writeFile(
    generateDeleteHook(obj),
    `app/${entity}/hooks/useDelete${entity.pascalCase()}.ts`
  );
}

export function generatePages(obj: BaseObject) {
  generateInterfaces(obj);
  generateComponents(obj);
  generateHooks(obj);
}
