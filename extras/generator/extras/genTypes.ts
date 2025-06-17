import { mapObjectFields } from "@/extras/generator/utils";
import { BaseObject } from "@/types/generatorTypes";

export function generateTypesFile({ entity, model }: BaseObject) {
  const page = `
import { z } from "zod";

export const ${entity.pascalCase()}Schema = z.object({
  id: z.string(),
  ${mapObjectFields(model, (key, value) => `${key}: z.${value}()`).join(
    ",\n  "
  )}
});

export type ${entity.pascalCase()} = z.infer<typeof ${entity.pascalCase()}Schema>

// === SERIALIZERS ===

export const ${entity.pascalCase()}BodySerializer = z.object({
  name: z
    .string({
      required_error: "Nome é obrigatório",
    })
    .min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z
    .string({
      required_error: "Email é obrigatório",
    })
    .email("Email inválido"),
  password: z
    .string({ required_error: "Senha é obrigatória" })
    .min(8, "Senha deve ter pelo menos 8 caracteres"),

  ${mapObjectFields(model, (key, value) => `${key}: z.${value}({ required_error: "${key} é obrigatória" })`).join(
    ",\n  "
  )}
});

const ${entity.pascalCase()}IdSerializer = z.object({
  userId: z.string({ required_error: "Id do usuário é obrigatório" }),
});

export const ${entity.pascalCase()}UpdateSerializer = ${entity.pascalCase()}IdSerializer.merge(
  ${entity.pascalCase()}BodySerializer.partial()
);

const ${entity.pascalCase()}PaginatedSerializer = paginatedSerializer.merge(
  ${entity.pascalCase()}BodySerializer
);

// === INPUTS ===

export type ${entity.pascalCase()}Inputs = {
  create: z.infer<typeof ${entity.pascalCase()}BodySerializer>;
  update: z.infer<typeof ${entity.pascalCase()}IdSerializer & Partial<typeof ${entity.pascalCase()}BodySerializer>>;
  delete: z.infer<typeof ${entity.pascalCase()}IdSerializer>;
  getById: z.infer<typeof ${entity.pascalCase()}IdSerializer>;
  getPaginated: z.infer<typeof ${entity.pascalCase()}PaginatedSerializer>;
  // ADITIONAL OPERATION INPUTS
};

export type ${entity.pascalCase()}OperationsHandlers = {
  create: Handler<${entity.pascalCase()}Inputs["create"], Promise<${entity.pascalCase()}Response>>;
  update: Handler<${entity.pascalCase()}Inputs["update"], Promise<${entity.pascalCase()}Response>>;
  delete: Handler<${entity.pascalCase()}Inputs["delete"], Promise<${entity.pascalCase()}Response>>;
  getById: Handler<${entity.pascalCase()}Inputs["getById"], Promise<${entity.pascalCase()}Response>>;
  getPaginated: Handler<
  ${entity.pascalCase()}Inputs["getPaginated"],
    Promise<PaginatedResult<${entity.pascalCase()}Response>>
  >;
  // ADITIONAL OPERATION HANDLERS
};

`;
  return page;
}
