import { BaseObject } from "@/generator/default";


export function generateGetByIdSerializer(obj: BaseObject) {
    const { entity, model } = obj;
    const { pascalCase, camelCase } = entity;
  
    const serializer = `
    import { CommandHandler, DefaultResponse } from "@/types/commandHandler";
  
  import { ${pascalCase} } from "@/types/${camelCase}Types";
  import { parseZodError } from "@/utils/apiUtils";
  import { z } from "zod";
  
  const get${pascalCase}ByIdInput = z.object({
    ${camelCase}Id: z.string({ required_error: \`Id do \${pascalCase} é obrigatório\` }),
  });
  
  // === API HANDLERS ===
  
  export const validateGet${pascalCase}ByIdInput = (data: Get${pascalCase}ByIdInput) =>
    parseZodError<Get${pascalCase}ByIdInput>(get${pascalCase}ByIdInput, data);
  
  export type Get${pascalCase}ByIdHandler = CommandHandler<
    Get${pascalCase}ByIdInput,
    Promise<Get${pascalCase}ByIdOutput>
  >;
  
  // === EXPLICIT TYPES ===
  
  type Get${pascalCase}ByIdInput = z.infer<typeof get${pascalCase}ByIdInput>;
  
  interface Get${pascalCase}ByIdOutput extends DefaultResponse {
    ${camelCase}: Omit<${pascalCase}, "password">;
  }
  
    `;
    return serializer;
  }
  