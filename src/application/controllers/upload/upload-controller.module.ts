import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from 'src/services/multer/multer.service';
import { UploadController } from './upload.controller';

@Module({
  imports: [MulterModule.register(multerOptions)],
  controllers: [UploadController],
})
export class UploadControllerModule {}
