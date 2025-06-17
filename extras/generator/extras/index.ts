import { writeFile } from "../utils";
import { generateTypesFile } from "./genTypes";
import { BaseObject } from "@/types/generatorTypes";

export function generateExtras(obj: BaseObject) {
  writeFile(generateTypesFile(obj), `types/${obj.entity.camelCase()}Types.ts`);
}
