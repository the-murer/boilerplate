import { BaseObject } from "@/types/generatorTypes";
import { writeFile } from "@/extras/generator/utils";
import { generateRepository } from "./genRepository";
import { generateSchema } from "./genSchema";

export function generateDatabase(obj: BaseObject) {
  writeFile(generateSchema(obj), `types/${obj.entity.camelCase()}Types.ts`);
  writeFile(generateRepository(obj), `types/${obj.entity.camelCase()}Types.ts`);
}
