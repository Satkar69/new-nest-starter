import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from 'src/application/config/environment-config.module';
import { IDataServices } from 'src/core/abstracts';
import { PgDataServices } from './pg-data-services.service';
import providers from './providers';
import { appDataSourceProviders } from './providers/appDatabase.provider';
import { RawQuery } from './raw-query';
import { DataSeeder } from './seeder/seeder';
import { UnitOfWork } from './unit-of-work';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [
    ...providers,
    {
      provide: IDataServices,
      useClass: PgDataServices,
    },
    UnitOfWork,
    DataSeeder,
    RawQuery,
  ],
  exports: [...appDataSourceProviders, IDataServices],
})
export class PgDataServicesModule {}
