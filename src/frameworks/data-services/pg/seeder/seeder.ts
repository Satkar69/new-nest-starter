import { Injectable, Logger } from '@nestjs/common';
import { EnvironmentConfigService } from 'src/application/config/environment-config.service';
import { AdminRoleEnum } from 'src/common/enums/admin-role.enum';
import { Repository } from 'typeorm';
import { AdminEntity } from '../entities';

@Injectable()
export class DataSeeder {
  private configService: EnvironmentConfigService;
  constructor(configService: EnvironmentConfigService) {
    this.configService = configService;
  }

  async seedAdmin(repository: Repository<AdminEntity>) {
    const adminUser = await repository.findOne({
      where: { email: this.configService.getDefaultAdminEmail() },
    });

    if (!adminUser) {
      const adminUser: AdminEntity = repository.create({
        email: this.configService.getDefaultAdminEmail(),
        password: this.configService.getDefaultAdminPassword(),
        name: this.configService.getDefaultAdminName(),
        role: AdminRoleEnum.SUPER_ADMIN,
        avatar: this.configService.getDefaultAdminAvatar(),
      });
      await repository.insert(adminUser);
    } else {
      Logger.log('Admin user already exists', DataSeeder.name);
    }
  }

}
