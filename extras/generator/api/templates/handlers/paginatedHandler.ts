import { BaseObject } from "@/generator/default";


export function generateGetByIdHandler(obj: BaseObject) {
  const { entity, path, model } = obj;
  const { pascalCase, camelCase } = entity;

  const handler = `
import { Get${pascalCase}ByIdHandler as Handler } from "@/api/${camelCase}/serializers/get${pascalCase}ByIdSerializer";
import { NotFoundException } from "@/utils/errorUtils";
import dbConnect from "@/database/dbConnect";
import { find${pascalCase}ById } from "@/database/repository/${camelCase}Repository";
import { ${camelCase}Schema } from "@/types/${camelCase}Types";

const sanitized${pascalCase}Schema = ${camelCase}Schema.omit({ password: true });

export const get${pascalCase}ByIdHandler: Handler = async ({ ${camelCase}Id }) => {
  await dbConnect();
  const ${camelCase} = await find${pascalCase}ById(${camelCase}Id);

  if (!${camelCase}) {
    throw new NotFoundException(\`${pascalCase} with id \${${camelCase}Id} not found\`);
  }

  const sanitized${pascalCase} = sanitized${pascalCase}Schema.parse(${camelCase});

  return { success: true, ${camelCase}: sanitized${pascalCase} };
};
  `;
  return handler;
}