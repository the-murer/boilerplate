import { mapObjectFields } from "@/extras/generator/utils";
import { BaseObject } from "@/types/generatorTypes";

export function generateCreateHandler(obj: BaseObject) {
  const { entity, model } = obj;

  const handler = `
import dbConnect from "@/database/dbConnect";
import { Create${entity.pascalCase()}Handler as Handler } from "@/api/${entity.camelCase()}/serializers/create${entity.pascalCase()}Serializer";
import { create${entity.pascalCase()} } from "@/database/repository/${entity.camelCase()}Repository"; 

export const create${entity.pascalCase()}Handler: Handler = async ({
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
