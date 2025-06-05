import { mapObjectFields } from "@/extras/generator/utils";
import { BaseObject } from "@/types/generatorTypes";

export function generateGetSerializer(obj: BaseObject) {
  const { entity, model } = obj;

  const serializer = `
import { CommandHandler, DefaultResponse } from "@/types/commandHandler";
import { parseZodError } from "@/utils/apiUtils";
import { SortEnum, basePaginationResolver } from "@/utils/pagination";
import { z } from "zod";

import { ${entity.pascalCase()} } from "@/types/${entity.camelCase()}Types";

const get${entity.pluralPascal()}Input = basePaginationResolver.extend({
  ${mapObjectFields(model, (key, value) => `${key}: z.${value}().optional(),`).join("\n")}
});

// === API HANDLERS ===

export const validateGet${entity.pluralPascal()}Input = (data: Get${entity.pluralPascal()}Input) =>
  parseZodError<Get${entity.pluralPascal()}Input>(get${entity.pluralPascal()}Input, data);

export type Get${entity.pluralPascal()}Handler = CommandHandler<
  Get${entity.pluralPascal()}Input,
  Promise<Get${entity.pluralPascal()}Output>
>;

// === EXPLICIT TYPES ===

export type Get${entity.pluralPascal()}Input = z.infer<typeof get${entity.pluralPascal()}Input>;

interface Get${entity.pluralPascal()}Output extends DefaultResponse {
  ${entity.camelCase}s: ${entity.pascalCase()}[];
}
`;
  return serializer;
}
