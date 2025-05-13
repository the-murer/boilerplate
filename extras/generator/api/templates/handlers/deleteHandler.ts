import { BaseObject } from "@/generator/default";



export function generateDeleteHandler(obj: BaseObject) {
  const { entity, path, model } = obj;
  const { pascalCase, camelCase } = entity;

  const handler = `
import { Delete${pascalCase}ByIdHandler as Handler } from "@/api/${camelCase}/serializers/delete${pascalCase}ByIdSerializer";
import { NotFoundException } from "@/utils/errorUtils";
import dbConnect from "@/database/dbConnect";
import { delete${pascalCase}ById } from "@/database/repository/${camelCase}Repository";

export const delete${pascalCase}ByIdHandler: Handler = async ({ ${camelCase}Id }) => {
  await dbConnect();
  const ${camelCase} = await delete${pascalCase}ById(${camelCase}Id);

  if (!${camelCase}) {
    throw new NotFoundException(\`${pascalCase} with id \${${camelCase}Id} not found\`);
  }

  return { success: true, ${camelCase} };
};
  `;
  return handler;
}
