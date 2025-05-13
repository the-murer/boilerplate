import { BaseObject } from "@/generator/default";

export function generateCreateSerializer(obj: BaseObject) {
  const { entity, model } = obj;
  const { pascalCase, camelCase } = entity;

  const serializer = `
import { CommandHandler, DefaultResponse } from "@/types/commandHandler";

import { ${pascalCase} } from "@/types/${camelCase}Types";
import { parseZodError } from "@/utils/apiUtils";
import { z } from "zod";

export const create${pascalCase}Resolver = z.object({
  ${Object.keys(model)
    .map(
      (field) => `
    ${field}: z.${model[field]}(),`
    )
    .join("\n")}
});

// === API HANDLERS ===

export const validateCreate${pascalCase}Input = (data: Create${pascalCase}Input) =>
  parseZodError<Create${pascalCase}Input>(create${pascalCase}Resolver, data);

export type Create${pascalCase}Handler = CommandHandler<
  Create${pascalCase}Input,
  Promise<Create${pascalCase}Output>
>;

// === EXPLICIT TYPES ===

export type Create${pascalCase}Input = z.infer<typeof create${pascalCase}Resolver>;

interface Create${pascalCase}Output extends DefaultResponse {
  ${camelCase}: ${pascalCase};
}
`;
  return serializer;
}
