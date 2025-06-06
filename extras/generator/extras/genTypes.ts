import { mapObjectFields } from "@/extras/generator/utils";
import { BaseObject } from "@/types/generatorTypes";

export function generateTypesFile({ entity, model }: BaseObject) {
  const page = `
import { z } from "zod";

export const ${entity.pascalCase()}Schema = z.object({
  id: z.string(),
  ${mapObjectFields(model, (key, value) => `${key}: z.${value}()`)
    .join(",\n  ")}
});

export type ${entity.pascalCase()} = z.infer<typeof ${entity.pascalCase()}Schema>
`;
  return page;
}
