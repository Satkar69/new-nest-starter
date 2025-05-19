import { IEntityManager } from './repositories/entity-manager.abstract';

export abstract class IUnitOfWork {
  abstract execute<T>(operation: (manager: IEntityManager) => Promise<T>): Promise<T>;
}
