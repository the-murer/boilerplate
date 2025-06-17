import { BaseObject } from "@/types/generatorTypes";

export function generateDeleteHandler(obj: BaseObject) {
  const { entity } = obj;

  const handler = `
import { NotFoundException } from "@/utils/errorUtils";
import dbConnect from "@/database/dbConnect";
import { delete${entity.pascalCase()}ById } from "@/database/repository/${entity.camelCase()}Repository";
import { ${entity.pascalCase()}OperationsHandlers } from "@/types/${entity.camelCase()}Types";

export const delete${entity.pascalCase()}ByIdHandler: ${entity.pascalCase()}OperationsHandlers["delete"] = async ({ ${entity.camelCase()}Id }) => {
  await dbConnect();
  const ${entity.camelCase()} = await delete${entity.pascalCase()}ById(${entity.camelCase()}Id);

  if (!${entity.camelCase()}) {
    throw new NotFoundException(\`${entity.pascalCase()} with id \${${entity.camelCase()}Id} not found\`);
  }

  return { success: true, ${entity.camelCase()} };
};
  `;
  return handler;
}
