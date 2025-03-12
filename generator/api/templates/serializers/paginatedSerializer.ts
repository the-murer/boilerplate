import { BaseObject } from "@/generator/default";

export function generateGetSerializer(obj: BaseObject) {
  const { entity, model } = obj;
  const { pascalCase, camelCase, pluralCamel, pluralPascal } = entity;

  const serializer = `
import { CommandHandler, DefaultResponse } from "@/types/commandHandler";

import { ${pascalCase} } from "@/types/${camelCase}Types";
import { parseZodError } from "@/utils/apiUtils";
import { SortEnum, basePaginationResolver } from "@/utils/pagination";
import { z } from "zod";

const get${pluralPascal}Input = basePaginationResolver.extend({
  ${Object.keys(model)
    .map(
      (field) => `
    ${field}: z.${model[field]}().optional(),`
    ).join("\n")}
});

// === API HANDLERS ===

export const validateGet${pluralPascal}Input = (data: Get${pluralPascal}Input) =>
  parseZodError<Get${pluralPascal}Input>(get${pluralPascal}Input, data);

export type Get${pluralPascal}Handler = CommandHandler<
  Get${pluralPascal}Input,
  Promise<Get${pluralPascal}Output>
>;

// === EXPLICIT TYPES ===

export type Get${pluralPascal}Input = z.infer<typeof get${pluralPascal}Input>;

interface Get${pluralPascal}Output extends DefaultResponse {
  ${pluralCamel}: Omit<${pascalCase}, "password">[];
}`;
  return serializer;
}
