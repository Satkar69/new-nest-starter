import { Upload } from '@aws-sdk/lib-storage';

export interface IUploadResponse {
  response: any;
  imageUrl: string;
}
export abstract class IUploadService {
  abstract uploadFile(file: any, folder: string): Promise<IUploadResponse>;
  abstract uploadFiles(files: any[], folder: string): Promise<IUploadResponse[]>;
  abstract uploadFileStream(stream: any, fileName: string, folder: string): Upload;
}
