import { diskStorage } from 'multer';
import { HttpException, HttpStatus } from '@nestjs/common';
import { extname } from 'path';
import * as fs from 'fs';

function ensureDirectoryExistence(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export const multerOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      let uploadPath = 'public/uploads';
      if (file.mimetype === 'application/pdf') {
        uploadPath = 'public/pdfs';
      } else if (file.mimetype.startsWith('image/')) {
        uploadPath = 'public/images';
      }
      ensureDirectoryExistence(uploadPath);
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const originalName = file.originalname;
      const fileExt = extname(originalName);
      const name = originalName.replace(fileExt, '');
      cb(null, `${name}${fileExt}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|gif|pdf)$/.test(file.originalname);
    if (!allowed) {
      return cb(new HttpException('Unsupported media type', HttpStatus.UNSUPPORTED_MEDIA_TYPE), false);
    }
    cb(null, true);
  },
};
