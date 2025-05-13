import { BaseObject } from "@/generator/default";

export function generateDeleteSerializer(obj: BaseObject) {
    const { entity, model } = obj;
    const { pascalCase, camelCase } = entity;
  
    const serializer = `
    import { CommandHandler, DefaultResponse } from "@/types/commandHandler";
  
  import { ${pascalCase} } from "@/types/${camelCase}Types";
  import { parseZodError } from "@/utils/apiUtils";
  import { z } from "zod";
  
  const delete${pascalCase}ByIdInput = z.object({
    ${camelCase}Id: z.string({ required_error: "Id do ${camelCase} é obrigatório" }),
  });
  
  // === API HANDLERS ===
  
  export const validateDelete${pascalCase}ByIdInput = (data: Delete${pascalCase}ByIdInput) =>
    parseZodError<Delete${pascalCase}ByIdInput>(delete${pascalCase}ByIdInput, data);
  
  export type Delete${pascalCase}ByIdHandler = CommandHandler<
    Delete${pascalCase}ByIdInput,
    Promise<Delete${pascalCase}ByIdOutput>
  >;
  
  // === EXPLICIT TYPES ===
  
  export type Delete${pascalCase}ByIdInput = z.infer<typeof delete${pascalCase}ByIdInput>;
  
  interface Delete${pascalCase}ByIdOutput extends DefaultResponse {
    ${camelCase}: ${pascalCase};
  }
  
    `;
    return serializer;
  }
  