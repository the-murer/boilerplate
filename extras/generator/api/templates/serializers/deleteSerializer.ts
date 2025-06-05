import { BaseObject } from "@/types/generatorTypes";

export function generateDeleteSerializer(obj: BaseObject) {
  const { entity } = obj;

  const serializer = `
import { CommandHandler, DefaultResponse } from "@/types/commandHandler";
import { parseZodError } from "@/utils/apiUtils";
import { z } from "zod";

import { ${entity.pascalCase()} } from "@/types/${entity.camelCase()}Types";

const delete${entity.pascalCase()}ByIdInput = z.object({
  ${entity.camelCase()}Id: z.string({ required_error: "Id do ${entity.camelCase()} é obrigatório" }),
});

// === API HANDLERS ===

export const validateDelete${entity.pascalCase()}ByIdInput = (data: Delete${entity.pascalCase()}ByIdInput) =>
  parseZodError<Delete${entity.pascalCase()}ByIdInput>(delete${entity.pascalCase()}ByIdInput, data);

export type Delete${entity.pascalCase()}ByIdHandler = CommandHandler<
  Delete${entity.pascalCase()}ByIdInput,
  Promise<Delete${entity.pascalCase()}ByIdOutput>
>;

// === EXPLICIT TYPES ===

export type Delete${entity.pascalCase()}ByIdInput = z.infer<typeof delete${entity.pascalCase()}ByIdInput>;

interface Delete${entity.pascalCase()}ByIdOutput extends DefaultResponse {
  ${entity.camelCase()}: ${entity.pascalCase()};
}  
`;
  return serializer;
}
