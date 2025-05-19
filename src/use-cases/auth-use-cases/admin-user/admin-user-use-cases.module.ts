import { Module } from '@nestjs/common';
import { BcryptModule } from 'src/services/bcrypt/bcrypt.module';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { JwtServiceModule } from 'src/services/jwt/jwt.module';
import { AdminUserAuthUseCaseService } from './admin-user-auth-use-case.service';
import { AdminUserFactoryService } from './admin-user-factory.service';

@Module({
  imports: [DataServicesModule, BcryptModule, JwtServiceModule],
  providers: [AdminUserFactoryService, AdminUserAuthUseCaseService],
  exports: [AdminUserFactoryService, AdminUserAuthUseCaseService],
})
export class AdminUserUseCasesModule {}
