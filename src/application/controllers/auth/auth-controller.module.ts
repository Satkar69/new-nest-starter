import { Module } from '@nestjs/common';
import { BcryptModule } from 'src/services/bcrypt/bcrypt.module';
import { AdminUserUseCasesModule } from 'src/use-cases/auth-use-cases/admin-user/admin-user-use-cases.module';
import { AdminAuthController } from './admin-auth.controller';

@Module({
  imports: [AdminUserUseCasesModule, BcryptModule],
  controllers: [AdminAuthController],
})
export class AuthControllerModule {}
