import { Module } from '@nestjs/common';
import { IUploadService } from 'src/core/abstracts/upload-service.abstract';
import { S3ServicesModule } from './s3/s3-services.module';
import { UploadService } from './upload.service';

@Module({
  imports: [S3ServicesModule],
  providers: [
    {
      provide: IUploadService,
      useClass: UploadService,
    },
  ],
  exports: [IUploadService],
})
export class UploadModule {}
