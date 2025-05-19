import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from 'src/application/config/environment-config.module';
import { S3UploadService } from './s3.service';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [S3UploadService],
  exports: [S3UploadService],
})
export class S3ServicesModule {}
