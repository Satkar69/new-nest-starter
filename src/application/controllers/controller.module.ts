import { Module } from '@nestjs/common';
import { UploadControllerModule } from './upload/upload-controller.module';
@Module({
  imports: [UploadControllerModule],
  exports: [UploadControllerModule],
})
export class ControllerModule {}
