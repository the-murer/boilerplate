import { mapObjectFields } from "@/extras/generator/utils";
import { BaseObject } from "@/types/generatorTypes";

export function generateSchema({ entity, model }: BaseObject) {
  const page = `
import mongoose, { Types } from "mongoose";

export interface ${entity.pluralPascal()} extends mongoose.Document {
  ${mapObjectFields(model, (key, value) => `${key}: ${value}`)
    .join("\n  ")}
}

const ${entity.pascalCase()}Schema = new mongoose.Schema<${entity.pluralPascal()}>({
  ${mapObjectFields(model, (key, value) => `${key}: {
    type: ${value},
    required: true,
  },`)
    .join("\n  ")}
});

export default mongoose.models.${entity.pascalCase()} ||
  mongoose.model<${entity.pluralPascal()}>("${entity.pascalCase()}", ${entity.pascalCase()}Schema);
`;
  return page;
}
