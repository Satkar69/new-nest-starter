import { ParseFilePipe, ParseFilePipeBuilder } from '@nestjs/common';
import AppException from 'src/application/exception/app.exception';

export type FileTypeValidatorOptions = {
  fileType: string | RegExp;
  maxSize: number;
  isRequired: boolean;
  status?: number;
};
export function createMulterImagePipeBuilder(
  options: FileTypeValidatorOptions = {
    fileType: /^(image\/(jpg|jpeg|png|gif|svg|webp)|application\/pdf)$/,
    maxSize: 1024 * 1024 * 5,
    isRequired: false,
    status: 422,
  },
): ParseFilePipe {
  return new ParseFilePipeBuilder()
    .addFileTypeValidator({
      fileType: new RegExp(options.fileType),
    })
    .addMaxSizeValidator({
      maxSize: options.maxSize,
    })
    .build({
      fileIsRequired: options.isRequired,
      errorHttpStatusCode: options.status || 422,
      exceptionFactory: (error) => {
        let msg = error;
        if (error.includes('expected type')) {
          msg = `Invalid file type. Only JPG, JPEG, PNG, GIF, SVG, PDF and  WEBP are allowed.`;
        }
        if (error.includes('expected size')) {
          msg = `File size is too large.`;
        }

        return new AppException({}, msg, 422);
      },
    });
}
