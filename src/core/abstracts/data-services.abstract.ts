import { AdminModel } from '../models';
import { IRawQuery } from './raw-query.abstract';
import { IAdminRepository } from './repositories/admin.abstract';
import { IUnitOfWork } from './unit-of-work.abstract';

export abstract class IDataServices {
  abstract admin: IAdminRepository<AdminModel>;
 
  /**
   * for transaction management in the unit of work.
   */
  abstract unitOfWork: IUnitOfWork;
  abstract rawQuery: IRawQuery;
}
