import { generateApi } from "./generateApi";
import { plural } from "pluralize";

const readline = require('readline');

interface ModelAttribute {
  name: string;
  type: string;
}

export interface BaseObject {
  entity: {
    camelCase: string;
    pascalCase: string;
    kebabCase: string;
    snakeCase: string;
    pluralCamel: string;
    pluralPascal: string;
    pluralKebab: string;
  };
  path: string;
  initApi: boolean;
  initPage: boolean;
  initDatabase: boolean;
  model: Record<string, string>;
}

// OBJETO BASE INICIAL
const baseObject: BaseObject = {
  entity: {
    camelCase: '',
    pascalCase: '',
    kebabCase: '',
    snakeCase: '',
    pluralCamel: '',
    pluralPascal: '',
    pluralKebab: '',
  },
  path: '',
  initApi: false,
  initPage: false,
  initDatabase: false,
  model: {},
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question + ' ', (answer: string) => resolve(answer.trim()));
  });
}

// PERGUNTA BOOLEANA
async function askBooleanOption(label: string): Promise<boolean> {
  return new Promise((resolve) => {
    let selected = false;

    function render() {
      console.clear();
      console.log(`Pressione Espaço para alterar e Enter para confirmar:\n`);
      console.log(`${selected ? '[x]' : '[ ]'} ${label}`);
    }

    function onKeyPress(_: null, key: { name: string }) {
      if (key.name === 'space') {
        selected = !selected;
        render();
      } else if (key.name === 'return') {
        process.stdin.off('keypress', onKeyPress);
        resolve(selected);
      }
    }

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', onKeyPress);
    render();
  });
}

// ITERADOR DE ATRIBUTOS
async function askModelAttributes() {
  console.log('\nAgora vamos definir os atributos do modelo.');
  while (true) {
    const name = await askQuestion('Nome do atributo (ou Enter para finalizar):');
    if (!name) break;
    const type = await askQuestion(`Tipo do atributo "${name}":`);
    baseObject.model[name] = type;
  }
}

// RODA OS GERADORES
function generateFiles(baseObject: BaseObject) {
  console.log('\nChamando a função geradora com os seguintes dados:');
  console.log(JSON.stringify(baseObject, null, 2));
  const { initApi, initPage } = baseObject;

  if (initApi) {
    generateApi(baseObject);
    console.log('Gerando API...');
  }

  if (initPage) {
    console.log('Gerando Página...');
  }
}

function generateEntityNames(entityName: string) {
  const camelCase = entityName.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
  const pascalCase = camelCase.replace(/(^|\s+)[a-z]/g, (match) => match.toUpperCase());
  const kebabCase = entityName.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, '$1-');
  const snakeCase = entityName.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, '_$1');
  const pluralCamel = plural(camelCase);
  const pluralPascal = plural(pascalCase);
  const pluralKebab = plural(kebabCase);

  return { camelCase, pascalCase, pluralCamel, pluralPascal, kebabCase, pluralKebab, snakeCase };
}

// GERENCIADOR DE GERADOR
async function main() {
  baseObject.entity = generateEntityNames(await askQuestion('Nome da entidade:'));
  baseObject.path = await askQuestion('Caminho do arquivo:');
  baseObject.initApi = await askBooleanOption('Gerar API?');
  baseObject.initPage = await askBooleanOption('Gerar Página?');
  baseObject.initDatabase = await askBooleanOption('Gerar Banco de Dados?');

  await askModelAttributes();
  rl.close();

  generateFiles(baseObject);
}

main();
