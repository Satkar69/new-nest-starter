import { IsEnum, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';
import { UploadTypeEnum } from 'src/core/config/upload-types';

export class UploadImageDto {
  @IsNotEmpty()
  @IsEnum(UploadTypeEnum)
  uploadFolder: UploadTypeEnum;

  @IsOptional()
  @ValidateIf((o) => o.uploadFolder === UploadTypeEnum.PRODUCT)
  @IsNotEmpty()
  partNumber?: string;
}
