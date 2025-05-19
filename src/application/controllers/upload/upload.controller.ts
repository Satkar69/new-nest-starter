import { Controller, UseInterceptors, Post, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createMulterImagePipeBuilder } from 'src/application/pipes/multer-image-pipe-builder.pipe';

@Controller()
export class UploadController {
  @Post('/file')
  @UseInterceptors(FileInterceptor('rocMedia'))
  async uploadImage(
    @UploadedFile(createMulterImagePipeBuilder())
    file: Express.Multer.File,
  ) {
    return {
      filename: file.filename,
      path: file.path,
      size: file.size,
    };
  }
}
