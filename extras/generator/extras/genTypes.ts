import { BaseObject } from "..";

export function generateTypesFile({ entity, model }: BaseObject) {
  const page = `
import { z } from "zod";

export const ${entity.pascalCase()}Schema = z.object({
  id: z.string(),
  ${Object.entries(model)
    .map(([key, value]) => `${key}: z.${value}()`)
    .join(",\n  ")}
});

export type ${entity.pascalCase()} = z.infer<typeof ${entity.pascalCase()}Schema>
`;
  return page;
}
