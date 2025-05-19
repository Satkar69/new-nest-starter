export interface UploadFileConfig {
  getBucketAccessKey(): string;
  getBucketAccessSecret(): string;
  getBucketRegion(): string;
  getBucketName(): string;
}
