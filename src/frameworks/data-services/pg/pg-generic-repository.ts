import AppNotFoundException from 'src/application/exception/app-not-found.exception';
import rescue from 'src/common/helpers/rescue.helper';
import { AppClsStore } from 'src/common/interface/app-cls-store.interface';
import { IPaginationQuery } from 'src/common/interface/response/interface/pagination.options.interface';
import { IPaginationData } from 'src/common/interface/response/interface/response-data.interface';
import { IGenericRepository, OtherMethodOptions } from 'src/core/abstracts';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import { EntityManager, Repository } from 'typeorm';

export class PgGenericRepository<T> implements IGenericRepository<T> {
  protected _repository: Repository<T>;
  protected cls: IClsStore<AppClsStore>;

  constructor(cls: IClsStore<AppClsStore>, repository: Repository<T>) {
    this.cls = cls;
    this._repository = repository;
  }

  async getAll(
    condition: NonNullable<unknown> | any[],
    relations: NonNullable<unknown>,
    order: NonNullable<unknown>,
    select: NonNullable<unknown>,
    manager?: EntityManager,
  ): Promise<IPaginationData> {
    return rescue<IPaginationData>(async (): Promise<IPaginationData> => {
      let { page, limit } = this.cls.get<IPaginationQuery>('paginationQuery');
      if (!page) page = 1;
      if (!limit) limit = 10;

      const repo = manager ? manager.getRepository(this._repository.target) : this._repository;
      const [data, total] = await repo.findAndCount({
        where: Array.isArray(condition) ? [...condition] : condition,
        skip: ((page || 1) - 1) * (limit || 10),
        take: limit || 10,
        relations: { ...relations },
        order: order ? { ...order } : ({ id: 'DESC' } as any),
        select: select,
      });
      return {
        data: data as [],
        total,
        limit: limit || 10,
        page: page || 1,
        previous: page > 1 ? `${Number(page) - 1}` : null,
        next: page * limit < total ? `${Number(page) + 1}` : null,
      };
    });
  }

  async getAllWithoutPagination(
    condition: NonNullable<unknown> | any[],
    relations: NonNullable<unknown>,
    order: NonNullable<unknown>,
    manager?: EntityManager,
  ): Promise<T[]> {
    const repo = manager ? manager.getRepository(this._repository.target) : this._repository;
    return rescue<T[]>(async (): Promise<T[]> => {
      return repo.find({
        where: condition,
        relations: { ...relations },
        order: order ? { ...order } : ({ createdAt: 'DESC' } as any),
      });
    });
  }

  async getOne(condition: any, relations?: NonNullable<unknown> | undefined, manager?: EntityManager): Promise<T> {
    const repo = manager ? manager.getRepository(this._repository.target) : this._repository;
    return rescue<T>(async (): Promise<T> => {
      const item: T = await repo.findOne({
        where: condition,
        relations: { ...relations },
      });
      if (item) {
        return item;
      } else {
        throw new AppNotFoundException(this._repository.metadata.targetName.replace('Entity', '') + ' not found', 404);
      }
    });
  }
  async getOneOrNull(
    condition: any,
    relations?: NonNullable<unknown> | undefined,
    options?: OtherMethodOptions,
    manager?: EntityManager,
  ): Promise<T> {
    return rescue<T>(async (): Promise<T> => {
      const repo = manager ? manager.getRepository(this._repository.target) : this._repository;
      const item: T = await repo.findOne({
        where: condition,
        relations: { ...relations },
        ...options,
      });
      if (item) {
        return item;
      }
      return null;
    });
  }

  async create(item: T, manager?: EntityManager): Promise<T> {
    const repo = manager ? manager.getRepository(this._repository.target) : this._repository;
    return rescue<T>(async (): Promise<T> => {
      return repo.save(item);
    });
  }

  async createBulk(item: T[], manager?: EntityManager): Promise<T[]> {
    const repo = manager ? manager.getRepository(this._repository.target) : this._repository;
    return rescue<T[]>(async (): Promise<T[]> => {
      return repo.save(item);
    });
  }

  async update(condition: NonNullable<unknown>, item: any, manager?: EntityManager) {
    const repo = manager ? manager.getRepository(this._repository.target) : this._repository;
    return rescue<T>(async (): Promise<T> => {
      const oldItem: T = await this.getOne(condition, null, manager);
      if (!oldItem) {
        throw new AppNotFoundException(this._repository.metadata.targetName.replace('Entity', '') + ' not found', 404);
      }
      await repo.update(condition, item);
      return repo.findOneBy(condition);
    });
  }
  async updateMany(condition: NonNullable<unknown>, item: any, manager?: EntityManager) {
    const repo = manager ? manager.getRepository(this._repository.target) : this._repository;
    return rescue<T>(async (): Promise<any> => {
      const updateResult = await repo.update(condition, item);
      return updateResult;
    });
  }

  async findOrCreate(
    condition: NonNullable<unknown>,
    item: T,
    relations?: NonNullable<unknown>,
    manager?: EntityManager,
  ): Promise<T> {
    const repo = manager ? manager.getRepository(this._repository.target) : this._repository;
    return rescue<T>(async (): Promise<T> => {
      const oldItem: T = await repo.findOne({
        where: condition,
        relations: { ...relations },
      });
      if (!oldItem) {
        return this._repository.save(item);
      }
      return oldItem;
    });
  }

  async createOrUpdate(
    condition: NonNullable<unknown>,
    item: any,
    relations?: NonNullable<unknown>,
    manager?: EntityManager,
  ): Promise<T> {
    const repo = manager ? manager.getRepository(this._repository.target) : this._repository;
    const oldItem: T = await repo.findOne({
      where: condition,
      relations: { ...relations },
    });

    if (!oldItem) {
      return repo.save(item);
    }

    const updatedItem = repo.merge(oldItem, item);
    return await repo.save(updatedItem);
  }

  async remove(
    condition: NonNullable<unknown>,
    relations?: NonNullable<unknown>,
    manager?: EntityManager,
  ): Promise<any> {
    const repo = manager ? manager.getRepository(this._repository.target) : this._repository;
    return rescue<any>(async (): Promise<any> => {
      const event = await this.getAllWithoutPagination(condition, relations, manager);
      return repo.softRemove(event);
    });
  }

  async hardDelete(data: any[], manager?: EntityManager): Promise<number> {
    const repo = manager ? manager.getRepository(this._repository.target) : this._repository;
    return rescue<number>(async (): Promise<number> => {
      const ids = data.map((item) => item.id);
      const response = await repo.delete(ids);
      return response.affected || 0;
    });
  }

  getRepo(): Repository<T> {
    return this._repository;
  }
}
