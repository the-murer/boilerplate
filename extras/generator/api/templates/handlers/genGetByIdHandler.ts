import { BaseObject } from "@/types/generatorTypes";

export function generateGetByIdHandler(obj: BaseObject) {
  const { entity } = obj;

  const handler = `
import { NotFoundException } from "@/utils/errorUtils";
import dbConnect from "@/database/dbConnect";

import { Get${entity.pascalCase()}ByIdHandler as Handler } from "@/api/${entity.camelCase()}/serializers/get${entity.pascalCase()}ByIdSerializer";
import { find${entity.pascalCase()}ById } from "@/database/repository/${entity.camelCase()}Repository";


export const get${entity.pascalCase()}ByIdHandler: Handler = async ({ ${entity.camelCase()}Id }) => {
  await dbConnect();
  const ${entity.camelCase()} = await find${entity.pascalCase()}ById(${entity.camelCase()}Id);

  if (!${entity.camelCase()}) {
    throw new NotFoundException(\`${entity.pascalCase()} with id \${${entity.camelCase()}Id} not found\`);
  }

  return { success: true, ${entity.camelCase()} };
};
  `;
  return handler;
}
