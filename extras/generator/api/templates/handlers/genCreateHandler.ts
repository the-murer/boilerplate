import { mapObjectFields } from "@/extras/generator/utils";
import { BaseObject } from "@/types/generatorTypes";

export function generateCreateHandler(obj: BaseObject) {
  const { entity, model } = obj;

  const handler = `
import dbConnect from "@/database/dbConnect";
import { create${entity.pascalCase()} } from "@/database/repository/${entity.camelCase()}Repository"; 
import { ${entity.pascalCase()}OperationsHandlers } from "@/types/${entity.camelCase()}Types";

export const create${entity.pascalCase()}Handler: ${entity.pascalCase()}OperationsHandlers["create"] = async ({
  ${mapObjectFields(model, (key) => `${key},`).join("\n  ")}
}) => {
  await dbConnect();
 
  const ${entity.camelCase()} = await create${entity.pascalCase()}({
    ${mapObjectFields(model, (key) => `${key},`).join("\n  ")}
  });

  return { success: true, ${entity.camelCase()} };
};
  `;
  return handler;
}
