import { BaseObject } from "@/types/generatorTypes";

export function generateGetByIdSerializer(obj: BaseObject) {
  const { entity } = obj;

  const serializer = `
    import { CommandHandler, DefaultResponse } from "@/types/commandHandler";
    import { parseZodError } from "@/utils/apiUtils";
    import { z } from "zod";
  
  import { ${entity.pascalCase()} } from "@/types/${entity.camelCase()}Types";
  
  const get${entity.pascalCase()}ByIdInput = z.object({
    ${entity.camelCase()}Id: z.string({ required_error: \`Id do \${entity.pascalCase()} é obrigatório\` }),
  });
  
  // === API HANDLERS ===
  
  export const validateGet${entity.pascalCase()}ByIdInput = (data: Get${entity.pascalCase()}ByIdInput) =>
    parseZodError<Get${entity.pascalCase()}ByIdInput>(get${entity.pascalCase()}ByIdInput, data);
  
  export type Get${entity.pascalCase()}ByIdHandler = CommandHandler<
    Get${entity.pascalCase()}ByIdInput,
    Promise<Get${entity.pascalCase()}ByIdOutput>
  >;
  
  // === EXPLICIT TYPES ===
  
  type Get${entity.pascalCase()}ByIdInput = z.infer<typeof get${entity.pascalCase()}ByIdInput>;
  
  interface Get${entity.pascalCase()}ByIdOutput extends DefaultResponse {
    ${entity.camelCase()}: Omit<${entity.pascalCase()}, "password">;
  }
`;
  return serializer;
}
