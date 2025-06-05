import { mapObjectFields } from "@/extras/generator/utils";
import { BaseObject } from "@/types/generatorTypes";

export function generateRepository({ entity, model }: BaseObject) {
  const page = `
import { PaginatedResult, PaginationType } from "@/utils/pagination";

import ${entity.pascalCase()} from "@/database/models/${entity.pascalCase()}";
import { ${entity.pascalCase()} as ${entity.pascalCase()}Type } from "@/types/${entity.camelCase()}Types";

export type ${entity.pascalCase()}Filters = {
  ${mapObjectFields(model, (key, value) => `${key}: ${value}`)
    .join(",\n  ")}
};

export async function find${entity.pascalCase()}WithPagination({
  page,
  limit,
  sortField,
  sortOrder,
  ${mapObjectFields(model, (key) => `${key},`)
    .join("\n  ")}
}: PaginationType & ${entity.pascalCase()}Filters): Promise<PaginatedResult<${entity.pascalCase()}Type>> {
  const query: any = {};

  ${mapObjectFields(model, (key, value) => `if (${key}) query.${key} = { $regex: ${key}, $options: "i" };`)
    .join("\n  ")}

  if (page === 0) {
    const ${entity.pluralCamel()} = await ${entity.pascalCase()}.find(query)
      .sort({ [sortField]: sortOrder })
      .limit(limit);
    return {
      items: ${entity.pluralCamel()},
      metadata: {
        totalPages: 1,
        currentPage: 1,
        hasNextPage: false,
        hasPreviousPage: false,
        totalEntries: ${entity.pluralCamel()}.length,
      },
    };
  }

  const totalEntries = await ${entity.pascalCase()}.countDocuments(query);
  const totalPages = Math.ceil(totalEntries / limit);
  const ${entity.pluralCamel()} = (await ${entity.pascalCase()}.find(query)
    .skip((page - 1) * limit)
    .sort({ [sortField]: sortOrder })
    .limit(limit)) as ${entity.pascalCase()}Type[];

  return {
    items: ${entity.pluralCamel()},
    metadata: {
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      totalPages,
      currentPage: page,
      totalEntries,
    },
  };
}

export async function create${entity.pascalCase()}(
  ${entity.camelCase()}: Omit<${entity.pascalCase()}Type, "id">
): Promise<${entity.pascalCase()}Type> {
  return (await ${entity.pascalCase()}.create(${entity.camelCase()})) as ${entity.pascalCase()}Type;
}

export async function find${entity.pascalCase()}ById(id: string): Promise<${entity.pascalCase()}Type | null> {
  return (await ${entity.pascalCase()}.findById(id)) as ${entity.pascalCase()}Type | null;
}

export async function delete${entity.pascalCase()}ById(id: string): Promise<${entity.pascalCase()}Type | null> {
  return (await ${entity.pascalCase()}.findByIdAndDelete(id).lean()) as ${entity.pascalCase()}Type | null;
}

export async function update${entity.pascalCase()}ById(
  id: string,
  data: Partial<${entity.pascalCase()}Type>
): Promise<${entity.pascalCase()}Type> {
  return (await ${entity.pascalCase()}.findByIdAndUpdate(id, data, {
    new: true,
  }).lean()) as unknown as ${entity.pascalCase()}Type;
}
`;
  return page;
}
