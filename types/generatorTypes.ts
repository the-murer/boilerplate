export interface BaseObject {
  entity: string;
  model: Record<string, string>;
}

export interface GeneratorBaseObject extends BaseObject {
  path: string;
  initApi: boolean;
  initPage: boolean;
  initDatabase: boolean;
}
