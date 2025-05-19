import { Injectable } from '@nestjs/common';
import { IUploadResponse, IUploadService } from 'src/core/abstracts/upload-service.abstract';
import { S3UploadService } from './s3/s3.service';

@Injectable()
export class UploadService implements IUploadService {
  constructor(private readonly s3UploadService: S3UploadService) {}
  async uploadFile(file: any, folder: string): Promise<IUploadResponse> {
    return await this.s3UploadService.uploadFile(file, folder);
  }
  async uploadFiles(files: any[], folder: string): Promise<IUploadResponse[]> {
    return await Promise.all(
      files.map(async (file) => {
        return await this.uploadFile(file, folder);
      }),
    );
  }

  uploadFileStream(stream: any, fileName: string, folder: string) {
    return this.s3UploadService.uploadFileStream(stream, fileName, folder);
  }
}
