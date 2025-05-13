import { BaseObject } from "@/generator/default";

export function generateUpdateSerializer(obj: BaseObject) {
    const { entity, model } = obj;
    const { pascalCase, camelCase } = entity;
  
    const serializer = `
  import { CommandHandler, DefaultResponse } from "@/types/commandHandler";
  
  import { ${pascalCase} } from "@/types/${camelCase}Types";
  import { parseZodError } from "@/utils/apiUtils";
  import { z } from "zod";
  
  export const update${pascalCase}ByIdResolver = z.object({
    ${camelCase}Id: z.string({ required_error: \`Id do ${pascalCase} é obrigatório\` }),
  ${Object.keys(model)
    .map(
      (field) => `
    ${field}: z.${model[field]}(),`
    )
    .join("\n")}
  });
  
  // === API HANDLERS ===
  
  export const validateUpdate${pascalCase}ByIdInput = (data: Update${pascalCase}ByIdInput) =>
    parseZodError<Update${pascalCase}ByIdInput>(update${pascalCase}ByIdResolver, data);
  
  export type Update${pascalCase}ByIdHandler = CommandHandler<
    Update${pascalCase}ByIdInput,
    Promise<Update${pascalCase}ByIdOutput>
  >;
  
  // === EXPLICIT TYPES ===
  
  export type Update${pascalCase}ByIdInput = z.infer<typeof update${pascalCase}ByIdResolver>;
  
  interface Update${pascalCase}ByIdOutput extends DefaultResponse {
    ${camelCase}: ${pascalCase};
  }
  
    `;
    return serializer;
  }
  