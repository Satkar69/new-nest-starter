import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AppClsStore } from 'src/common/interface/app-cls-store.interface';
import { IJwtPayload } from 'src/common/interface/jwt-playload.interface';
import { IDataServices } from 'src/core/abstracts';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import { IJwtService } from 'src/core/abstracts/adapters/jwt.interface';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _jwtService: IJwtService,
    private _reflector: Reflector,
    private readonly cls: IClsStore<AppClsStore>,
    private readonly dataService: IDataServices,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { url: requestUrl } = request;

    // if is public set isPublic to true and return
    const isPublic =
      this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]) ||
      requestUrl.startsWith('/api/filter-max/public')
        ? true
        : false;
    if (isPublic) {
      this.cls.set('isPublic', true);
      return true;
    }

    // if token is present check token
    const token = this.extractTokenFromHeader(request);
    if (!token || token === 'null' || token === 'undefined') {
      return false;
    }
    const payload = await this._jwtService.checkToken<IJwtPayload>(token.trim());

    if (!payload) {
      return false;
    }

    const user = await this.dataService.admin.getOne({ email: payload?.sub?.toLowerCase() });

    if (!user) {
      return false;
    }

    this.cls.set('adminUser', user);

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
