/**
 * This folder keeps track of all the upload types and their respective folders
 */
export enum UploadTypeEnum {
  PRODUCT = 'product',
  USER = 'user',
  ASSET = 'asset',
  BRAND = 'brand',
}

export const uploadFolders = {
  [UploadTypeEnum.PRODUCT]: {
    getFolder(partNumber: string): string {
      return `products/${partNumber}`;
    },
  },
  [UploadTypeEnum.USER]: {
    getFolder(userId: string): string {
      return `users/${userId}`;
    },
  },
  [UploadTypeEnum.ASSET]: {
    getFolder(): string {
      return `assets`;
    },
  },
  [UploadTypeEnum.BRAND]: {
    getFolder(): string {
      return `brands`;
    },
  },
};
