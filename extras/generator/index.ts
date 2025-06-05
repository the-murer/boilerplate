import { generatePages } from "./page";
import { generateExtras } from "./extras";
import { generateDatabase } from "./database";
import { generateApi } from "./api";
import { GeneratorBaseObject } from "@/types/generatorTypes";
import {
  askBooleanOption,
  askModelAttributes,
  askQuestion,
} from "./generatorCli";

// OBJETO BASE INICIAL
const baseObject: GeneratorBaseObject = {
  entity: "",
  path: "",
  initApi: false,
  initPage: false,
  initDatabase: false,
  model: {},
};

// RODA OS GERADORES
function generateFiles(baseObject: GeneratorBaseObject) {
  console.log("\nChamando a função geradora com os seguintes dados:");
  console.log(JSON.stringify(baseObject, null, 2));
  const { initApi, initPage, initDatabase } = baseObject;

  if (initApi) {
    generateApi(baseObject);
    console.log("Gerando API...");
  }

  if (initPage) {
    generatePages(baseObject);
    console.log("Gerando Página...");
  }

  if (initDatabase) {
    generateDatabase(baseObject);
    console.log("Gerando Banco de Dados...");
  }

  generateExtras(baseObject);
  console.log("Gerando Extras...");
}

// GERENCIADOR DE GERADOR
async function main() {
  baseObject.entity = await askQuestion("Nome da entidade:");
  baseObject.path = await askQuestion("Caminho do arquivo:");
  baseObject.initApi = await askBooleanOption("Gerar API?");
  baseObject.initPage = await askBooleanOption("Gerar Página?");
  baseObject.initDatabase = await askBooleanOption("Gerar Banco de Dados?");

  baseObject.model = await askModelAttributes();

  generateFiles(baseObject);
}

main();
