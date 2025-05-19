import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AdminRoleEnum } from 'src/common/enums/admin-role.enum';
import { AppClsStore } from 'src/common/interface/app-cls-store.interface';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import { AdminModel } from 'src/core/models';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly cls: IClsStore<AppClsStore>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.cls.get<boolean>('isPublic')) {
      /**
       * If the route is public, then no need to check for any roles.
       */
      return true;
    }

    const rolesThatCanAccess = this.reflector.getAllAndOverride<AdminRoleEnum[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!rolesThatCanAccess || !rolesThatCanAccess.length) {
      /**
       * If there is no role provided, then it means any logged in user can access the route
       */
      return true;
    }

    const user = this.cls.get<AdminModel>('adminUser');
    if (rolesThatCanAccess.some((role) => user.role === role)) {
      return true;
    }
    return false;
  }
}
