import { IPaginationData } from 'src/common/interface/response/interface/response-data.interface';
import { RelationType } from 'src/common/type/relation';
import { Repository } from 'typeorm';
import { IEntityManager } from './repositories/entity-manager.abstract';

export type keyValueObj = {
  [key: string]: any;
};
export type OtherMethodOptions = {
  withDeleted?: boolean;
  order?: any;
};
export abstract class IGenericRepository<T> {
  abstract getAll(
    condition?: keyValueObj | any[],
    relations?: RelationType,
    order?: keyValueObj,
    select?: keyValueObj,
    manager?: IEntityManager,
  ): Promise<IPaginationData>;

  abstract getAllWithoutPagination(
    condition?: keyValueObj | any[],
    relations?: RelationType,
    order?: keyValueObj,
    manager?: IEntityManager,
  ): Promise<T[]>;

  abstract getOne(condition: keyValueObj, relations?: RelationType): Promise<T>;

  abstract getOneOrNull(
    condition: keyValueObj | any[],
    relations?: RelationType,
    methodOptions?: OtherMethodOptions,
    manager?: IEntityManager,
  ): Promise<T>;

  abstract create(item: T, manager?: IEntityManager): Promise<T>;

  abstract update(condition: keyValueObj, item: T, manager?: IEntityManager): Promise<T>;

  abstract findOrCreate(
    condition: keyValueObj,
    item: T,
    relations?: RelationType,
    manager?: IEntityManager,
  ): Promise<T>;

  abstract createOrUpdate(
    condition: keyValueObj,
    item: T,
    relations?: RelationType,
    manager?: IEntityManager,
  ): Promise<T>;

  abstract createBulk(items: T[], manager?: IEntityManager): Promise<T[]>;

  abstract updateMany(condition: keyValueObj, item: keyValueObj, manager?: IEntityManager): Promise<any>;

  abstract remove(condition: keyValueObj, relations?: RelationType, manager?: IEntityManager): Promise<any>;

  abstract hardDelete(data: any[], manager?: IEntityManager): Promise<any>;
  abstract hardDelete(data: any[], manager?: IEntityManager): Promise<any>;
  abstract getRepo(): Repository<T>;
}
