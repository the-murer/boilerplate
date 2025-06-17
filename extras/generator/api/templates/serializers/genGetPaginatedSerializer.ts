import { mapObjectFields } from "@/extras/generator/utils";
import { BaseObject } from "@/types/generatorTypes";

export function generateGetPaginatedSerializer(obj: BaseObject) {
  const { entity, model } = obj;

  const serializer = `
import { CommandHandler, DefaultResponse } from "@/types/commandHandler";
import { parseZodError } from "@/utils/apiUtils";
import { SortEnum, basePaginationResolver } from "@/utils/pagination";
import { z } from "zod";

import { ${entity.pascalCase()} } from "@/types/${entity.camelCase()}Types";

const get${entity.pluralPascal()}PaginatedInput = basePaginationResolver.extend({
  ${mapObjectFields(model, (key, value) => `${key}: z.${value}().optional(),`).join("\n")}
});

// === API HANDLERS ===

export const validateGet${entity.pluralPascal()}PaginatedInput = (data: Get${entity.pluralPascal()}Input) =>
  parseZodError<Get${entity.pluralPascal()}PaginatedInput>(get${entity.pluralPascal()}PaginatedInput, data);

export type Get${entity.pluralPascal()}PaginatedHandler = CommandHandler<
  Get${entity.pluralPascal()}PaginatedInput,
  Promise<Get${entity.pluralPascal()}PaginatedOutput>
>;

// === EXPLICIT TYPES ===

export type Get${entity.pluralPascal()}PaginatedInput = z.infer<typeof get${entity.pluralPascal()}PaginatedInput>;

interface Get${entity.pluralPascal()}PaginatedOutput extends DefaultResponse {
  ${entity.pluralCamel()}: ${entity.pascalCase()}[];
}
`;
  return serializer;
}
