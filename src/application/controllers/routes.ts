import { Routes } from '@nestjs/core';
import { AuthControllerModule } from './auth/auth-controller.module';
import { UploadControllerModule } from './upload/upload-controller.module';

const routes: Routes = [
  {
    path: '/filter-max',
    children: [
      {
        path: '/admin',
        children: [],
      },
    ],
  },
  {
    path: '/auth',
    children: [AuthControllerModule],
  },
  {
    path: '/upload',
    children: [UploadControllerModule],
  },
];

export default routes;
