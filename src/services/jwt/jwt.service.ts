import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from 'src/common/interface/jwt-playload.interface';
import { IJwtService } from 'src/core/abstracts/adapters/jwt.interface';

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async checkToken(token: string): Promise<any> {
    const decode = await this.jwtService.verifyAsync(token);
    return decode;
  }

  async createToken(payload: IJwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async createResetPasswordToken(payload: any) {
    // expires in 5 minutes
    const exp = 60 * 5;
    return this.jwtService.signAsync(payload, { expiresIn: exp });
  }

  async createMasqueraderToken(payload: any) {
    return this.jwtService.signAsync(payload);
  }

  async verifyAsync(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token);
  }

  async signAsync(payload: any, options?: any): Promise<string> {
    return this.jwtService.signAsync(payload, options);
  }
}
