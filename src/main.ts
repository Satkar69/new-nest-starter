import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationException } from './application/exception/validation.exception';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  // prefix
  app.setGlobalPrefix('api');

  // -- Cors setup
  if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
    app.enableCors({
      origin: '*',
      // credentials: true,
    });
  }
  //  validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        return new ValidationException(errors);
      },
    }),
  );

  await app.listen(port, () => {
    Logger.log(`Server running on port ${port}`, 'Bootstrap');
  });
}
bootstrap();

// [
//   'http://localhost:3000',
//   'https://filtermax-admin-next.vercel.app',
//   'http://localhost:3001',
//   'https://fleetmanager-filtermax.vercel.app',
// ]
