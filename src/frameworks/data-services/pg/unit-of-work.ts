import { Inject, Injectable } from '@nestjs/common';
import AppException from 'src/application/exception/app.exception';
import InjectableString from 'src/common/injectable.string';
import { IUnitOfWork } from 'src/core/abstracts/unit-of-work.abstract';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class UnitOfWork implements IUnitOfWork {
  constructor(
    @Inject(InjectableString.APP_DATA_SOURCE)
    private dataSource: DataSource,
  ) {}

  async execute<T>(operation: (manager: EntityManager) => Promise<T>): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const data = await operation(queryRunner.manager);

      await queryRunner.commitTransaction();
      return data;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      if (err instanceof AppException) {
        throw err;
      } else {
        console.log(err);
        throw new AppException('Transaction failed');
      }
    } finally {
      await queryRunner.release();
    }
  }
}
