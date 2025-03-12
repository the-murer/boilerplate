import { BaseObject } from "@/generator/default";

export function generateCreateHandler(obj: BaseObject) {
  const { entity, path, model } = obj;
  const { pascalCase, camelCase } = entity;

  const handler = `
import { Create${pascalCase}Handler as Handler } from "@/api/${camelCase}/serializers/create${pascalCase}Serializer";
import { ${pascalCase} } from "@/types/${camelCase}Types";
import dbConnect from "@/database/dbConnect";
import { create${pascalCase} } from "@/database/repository/${camelCase}Repository";
import { hash } from "bcrypt";

export const create${pascalCase}Handler: Handler = async ({ name, email, password }) => {
  await dbConnect();

  const hashedPassword = await hash(password, 10);

  const ${camelCase} = await create${pascalCase}({
    name,
    email,
    password: hashedPassword,
  });


  const { password: _, ...${camelCase}WithoutPassword } = ${camelCase};

  return { success: true, ${camelCase}: ${camelCase}WithoutPassword };
};
  `;
  return handler;
}