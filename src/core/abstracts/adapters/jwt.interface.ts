import { IJwtPayload } from 'src/common/interface/jwt-playload.interface';

export interface IForgotPasswordPayload {
  sub: string;
  isPasswordResetToken: boolean;
}

export interface IMasqueraderPayload {
  sub: string;
  isMasquerader: boolean;
  masqueraderSub: string;
}
export abstract class IJwtService {
  abstract checkToken<T>(token: string): Promise<T>;
  abstract createToken(payload: IJwtPayload): Promise<string>;
  abstract createResetPasswordToken(payload: any): Promise<string>;
  abstract createMasqueraderToken(payload: IMasqueraderPayload): Promise<string>;
  abstract verifyAsync(token: string): Promise<any>;
  abstract signAsync(payload: any, options?: any): Promise<string>;
}
