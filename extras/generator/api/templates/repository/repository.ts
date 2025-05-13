import { BaseObject } from "@/generator/default";

const generateRepository = (obj: BaseObject) => {
  const { entity, path, model } = obj;
  const { pascalCase, camelCase, pluralCamel, pluralPascal } = entity;

  const repository = `
import { PaginatedResult, PaginationType } from "@/utils/pagination";

import ${pascalCase} from "@/database/models/${pascalCase}";
import { ${pascalCase} as ${pascalCase}Type } from "@/types/${camelCase}Types";

export type ${pascalCase}Filters = {
  name?: string;
  email?: string;
};

export async function find${pluralPascal}WithPagination({
  page,
  limit,
  sortField,
  sortOrder,
  name,
  email,
}: PaginationType & ${pascalCase}Filters): Promise<PaginatedResult> {
  const totalEntries = await ${pascalCase}.countDocuments();
  const totalPages = Math.ceil(totalEntries / limit);

  const query: any = {};

  if (name) query.name = { $regex: name, $options: "i" };
  if (email) query.email = { $regex: email, $options: "i" };

  const ${camelCase}s = (await ${pascalCase}.find(query)
    .skip((page - 1) * limit)
    .sort({ [sortField]: sortOrder })
    .limit(limit)) as ${pascalCase}Type[];

  return {
    ${camelCase}s,
    metadata: {
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      totalPages,
      currentPage: page,
      totalEntries,
    },
  };
}

export async function create${pascalCase}(
  ${camelCase}: Omit<${pascalCase}Type, "id">
): Promise<${pascalCase}Type> {
  return (await ${pascalCase}.create(${camelCase})) as ${pascalCase}Type;
}

export async function find${pascalCase}ById(id: string): Promise<${pascalCase}Type | null> {
  return (await ${pascalCase}.findById(id).lean()) as ${pascalCase}Type | null;
}

export async function delete${pascalCase}ById(id: string): Promise<${pascalCase}Type | null> {
  return (await ${pascalCase}.findByIdAndDelete(id).lean()) as ${pascalCase}Type | null;
}

export async function update${pascalCase}ById(
  id: string,
  data: Partial<${pascalCase}Type>
): Promise<${pascalCase}Type> {
  return (await ${pascalCase}.findByIdAndUpdate(id, data, {
    new: true,
  }).lean()) as unknown as ${pascalCase}Type;
}

  `;

  return repository;
};
