import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AppClsStore } from 'src/common/interface/app-cls-store.interface';
import { IDataServices } from 'src/core/abstracts';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import { IRawQuery } from 'src/core/abstracts/raw-query.abstract';
import { IAdminRepository } from 'src/core/abstracts/repositories/admin.abstract';
import { IUnitOfWork } from 'src/core/abstracts/unit-of-work.abstract';
import { AdminModel } from 'src/core/models';
import { Repository } from 'typeorm';
import { AdminEntity } from './entities';
import { RawQuery } from './raw-query';
import { PgAdminRepository } from './repositories/admin.repository';
import { UnitOfWork } from './unit-of-work';

@Injectable()
export class PgDataServices implements IDataServices, OnApplicationBootstrap {
  admin: IAdminRepository<AdminModel>;

  /**
   * for transaction management in the unit of work.
   */
  unitOfWork: IUnitOfWork;
  rawQuery: IRawQuery;
  constructor(
    @Inject(AdminEntity.REPOSITORY)
    private adminRepository: Repository<AdminEntity>,

    /**
     * Classes that are not tables in the database.
     */
    private readonly cls: IClsStore<AppClsStore>,
    private readonly unitOfWorkImpl: UnitOfWork,
    private readonly rawQueryImpl: RawQuery,
  ) {}

  onApplicationBootstrap() {
    // admin
    this.admin = new PgAdminRepository(this.cls, this.adminRepository);

    /**
     * It is for transaction management in the unit of work.
     */
    this.unitOfWork = this.unitOfWorkImpl;
    this.rawQuery = this.rawQueryImpl;
  }
}
