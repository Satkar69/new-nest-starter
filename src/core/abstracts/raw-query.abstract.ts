export abstract class IRawQuery {
  abstract execute(query: string): Promise<any>;
}
