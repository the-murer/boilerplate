import { BaseObject } from "@/generator/default";


export function generateUpdateHandler(obj: BaseObject) {
  const { entity, path, model } = obj;
  const { pascalCase, camelCase } = entity;

  const handler = `
import { Update${pascalCase}ByIdHandler as Handler } from "@/api/${camelCase}/serializers/update${pascalCase}ByIdSerializer";
import dbConnect from "@/database/dbConnect";
import {
  find${pascalCase}ById,
  update${pascalCase}ById,
} from "@/database/repository/${camelCase}Repository";
import { NotFoundException } from "@/utils/errorUtils";
import { hash } from "bcrypt";

export const update${pascalCase}ByIdHandler: Handler = async ({
  ${camelCase}Id,
  name,
  email,
  password,
}) => {
  await dbConnect();
  const ${camelCase} = await find${pascalCase}ById(${camelCase}Id);

  if (!${camelCase}) throw new NotFoundException(\`Usuário não \${${camelCase}Id} encontrado\`);

  if (password) ${camelCase}.password = await hash(password, 10);
  if (name) ${camelCase}.name = name;
  if (email) ${camelCase}.email = email;

  const updated${pascalCase} = await update${pascalCase}ById(${camelCase}Id, ${camelCase});

  return { success: true, ${camelCase}: updated${pascalCase} };
};
  `;
  return handler;
}