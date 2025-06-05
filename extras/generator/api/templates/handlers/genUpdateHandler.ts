import { mapObjectFields } from "@/extras/generator/utils";
import { BaseObject } from "@/types/generatorTypes";


export function generateUpdateHandler(obj: BaseObject) {
  const { entity, model } = obj;

  const handler = `
import dbConnect from "@/database/dbConnect";
import { NotFoundException } from "@/utils/errorUtils";
import { Update${entity.pascalCase()}ByIdHandler as Handler } from "@/api/${entity.camelCase()}/serializers/update${entity.pascalCase()}ByIdSerializer";
import {
  find${entity.pascalCase()}ById,
  update${entity.pascalCase()}ById,
} from "@/database/repository/${entity.camelCase()}Repository";

export const update${entity.pascalCase()}ByIdHandler: Handler = async ({
  ${entity.camelCase()}Id,
  ${mapObjectFields(model, (key) => `${key},`).join("\n  ")}
}) => {
  await dbConnect();
  const ${entity.camelCase()} = await find${entity.pascalCase()}ById(${entity.camelCase()}Id);

  if (!${entity.camelCase()}) throw new NotFoundException(\`Usuário não \${${entity.camelCase()}Id} encontrado\`);

  ${mapObjectFields(model, (key) => `if (${key}) ${entity.camelCase()}.${key} = ${key};`).join("\n  ")}

  const updated${entity.pascalCase()} = await update${entity.pascalCase()}ById(${entity.camelCase()}Id, ${entity.camelCase()});

  return { success: true, ${entity.camelCase()}: updated${entity.pascalCase()} };
};
  `;
  return handler;
}