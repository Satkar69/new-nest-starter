import { CompleteMultipartUploadCommandOutput, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Injectable } from '@nestjs/common';
import { EnvironmentConfigService } from 'src/application/config/environment-config.service';
import AppException from 'src/application/exception/app.exception';
import { slugify } from 'src/common/utils/string.utils';
import { IUploadResponse, IUploadService } from 'src/core/abstracts/upload-service.abstract';
import internal from 'stream';

@Injectable()
export class S3UploadService implements IUploadService {
  private imageUrl: string = null;
  private AWS_S3_BUCKET: string;
  private AWS_S3_REGION: string;
  private s3: S3Client;
  constructor(private configService: EnvironmentConfigService) {
    this.AWS_S3_BUCKET = this.configService.getBucketName();
    this.AWS_S3_REGION = this.configService.getBucketRegion();
    this.s3 = new S3Client({
      region: this.configService.getBucketRegion(),
      credentials: {
        accessKeyId: configService.getBucketAccessKey(),
        secretAccessKey: configService.getBucketAccessSecret(),
      },
    });
  }

  async uploadFile(file: Express.Multer.File, folder: string = 'uploads') {
    const { originalname } = file;
    const nameArray = originalname.split('.');
    const extension = nameArray.pop();
    const response = await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      Date.now() + '-' + slugify(nameArray.toString()) + '.' + extension,
      file.mimetype,
      folder,
    );
    this.imageUrl = response.Location;
    return {
      response,
      imageUrl: response.Location,
    } as IUploadResponse;
  }

  async s3_upload(
    file: Buffer,
    bucket: string,
    name: string,
    mimetype: string,
    folder: string,
  ): Promise<CompleteMultipartUploadCommandOutput> {
    try {
      // save buffer in s3
      const s3_upload = new Upload({
        client: this.s3,
        params: {
          Bucket: bucket,
          Key: `${folder}/${String(name)}`,
          Body: file,
          ContentType: mimetype,
          ContentDisposition: 'inline',
          ACL: 'public-read',
          CacheControl: 'max-age=31536000',
        },
      });
      return await s3_upload.done();
    } catch (e) {
      console.log(e);
      throw new AppException({ file: 'Failed to upload file' });
    }
  }

  getImageUrl(): string {
    return this.imageUrl;
  }

  async uploadFiles(files: Express.Multer.File[], folder: string = 'uploads') {
    const response = await Promise.all(
      files.map(async (file) => {
        return await this.uploadFile(file, folder);
      }),
    );
    return response;
  }

  uploadFileStream(stream: internal.PassThrough, fileName: string, folder: string = 'admin-exports') {
    try {
      const params = {
        Bucket: this.AWS_S3_BUCKET,
        Key: `${folder}/${fileName}`,
        Body: stream,
        ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ContentDisposition: 'attachment',
        // ACL: 'public-read',
      };

      const s3_upload = new Upload({
        client: this.s3,
        params,
      });

      return s3_upload;
    } catch (err) {
      console.log('Error uploading file stream to S3:', err);
      throw new AppException({ file: 'Failed to upload file stream' });
    }
  }
}
