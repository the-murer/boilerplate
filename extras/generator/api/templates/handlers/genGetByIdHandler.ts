import { BaseObject } from "@/types/generatorTypes";

export function generateGetByIdHandler(obj: BaseObject) {
  const { entity } = obj;

  const handler = `
import { NotFoundException } from "@/utils/errorUtils";
import dbConnect from "@/database/dbConnect";

import { ${entity.pascalCase()}OperationsHandlers } from "@/types/${entity.camelCase()}Types";
import { find${entity.pascalCase()}ById } from "@/database/repository/${entity.camelCase()}Repository";


export const get${entity.pascalCase()}ByIdHandler: ${entity.pascalCase()}OperationsHandlers["getById"] = async ({ ${entity.camelCase()}Id }) => {
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
