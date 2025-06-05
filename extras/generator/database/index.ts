import { BaseObject } from "@/types/generatorTypes";
import { writeFile } from "@/extras/generator/utils";
import { generateRepository } from "./genRepository";
import { generateSchema } from "./genSchema";

export function generateDatabase(obj: BaseObject) {
  writeFile(
    generateSchema(obj),
    `database/models/${obj.entity.pascalCase()}.ts`
  );
  writeFile(
    generateRepository(obj),
    `database/repository/${obj.entity.camelCase()}Repository.ts`
  );
}
