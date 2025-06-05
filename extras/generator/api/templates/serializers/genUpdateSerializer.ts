import { mapObjectFields } from "@/extras/generator/utils";
import { BaseObject } from "@/types/generatorTypes";

export function generateUpdateSerializer(obj: BaseObject) {
    const { entity, model } = obj;
  
    const serializer = `
  import { CommandHandler, DefaultResponse } from "@/types/commandHandler";
  
  import { ${entity.pascalCase()} } from "@/types/${entity.camelCase()}Types";
  import { parseZodError } from "@/utils/apiUtils";
  import { z } from "zod";
  
  export const update${entity.pascalCase()}ByIdResolver = z.object({
    ${entity.camelCase()}Id: z.string({ required_error: \`Id do ${entity.pascalCase()} é obrigatório\` }),
  ${mapObjectFields(model, (key, value) => `${key}: z.${value}(),`).join("\n")}
  });
  
  // === API HANDLERS ===
  
  export const validateUpdate${entity.pascalCase()}ByIdInput = (data: Update${entity.pascalCase()}ByIdInput) =>
    parseZodError<Update${entity.pascalCase()}ByIdInput>(update${entity.pascalCase()}ByIdResolver, data);
  
  export type Update${entity.pascalCase()}ByIdHandler = CommandHandler<
    Update${entity.pascalCase()}ByIdInput,
    Promise<Update${entity.pascalCase()}ByIdOutput>
  >;
  
  // === EXPLICIT TYPES ===
  
  export type Update${entity.pascalCase()}ByIdInput = z.infer<typeof update${entity.pascalCase()}ByIdResolver>;
  
  interface Update${entity.pascalCase()}ByIdOutput extends DefaultResponse {
    ${entity.camelCase()}: ${entity.pascalCase()};
  }
  
    `;
    return serializer;
  }
  