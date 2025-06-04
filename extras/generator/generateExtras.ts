import { BaseObject } from ".";
import { writeFile } from "./utils";
import { generateTypesFile } from "./extras/genTypes";

export function generateExtras(obj: BaseObject) {
  writeFile(generateTypesFile(obj), `types/${obj.entity.camelCase()}Types.ts`);
}
