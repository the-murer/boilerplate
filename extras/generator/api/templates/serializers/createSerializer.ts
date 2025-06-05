import { mapObjectFields } from "@/extras/generator/utils";
import { BaseObject } from "@/types/generatorTypes";

export function generateCreateSerializer(obj: BaseObject) {
  const { entity, model } = obj;

  const serializer = `
import { CommandHandler, DefaultResponse } from "@/types/commandHandler";
import { parseZodError } from "@/utils/apiUtils";
import { z } from "zod";

import { ${entity.pascalCase()} } from "@/types/${entity.camelCase()}Types";

export const create${entity.pascalCase()}Resolver = z.object({
  ${mapObjectFields(model, (key, value) => `${key}: z.${value}(),`).join(
    "\n  "
  )}
});

// === API HANDLERS ===

export const validateCreate${entity.pascalCase()}Input = (data: Create${entity.pascalCase()}Input) =>
  parseZodError<Create${entity.pascalCase()}Input>(create${entity.pascalCase()}Resolver, data);

export type Create${entity.pascalCase()}Handler = CommandHandler<
  Create${entity.pascalCase()}Input,
  Promise<Create${entity.pascalCase()}Output>
>;

// === EXPLICIT TYPES ===

export type Create${entity.pascalCase()}Input = z.infer<typeof create${entity.pascalCase()}Resolver>;

interface Create${entity.pascalCase()}Output extends DefaultResponse {
  ${entity.camelCase()}: ${entity.pascalCase()};
}
`;
  return serializer;
}
