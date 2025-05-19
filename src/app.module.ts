import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ClsGuard } from 'nestjs-cls';
import { join } from 'path';
import { EnvironmentConfigModule } from './application/config/environment-config.module';
import { ControllerModule } from './application/controllers/controller.module';
import routes from './application/controllers/routes';
import { HttpExceptionFilter } from './application/filters/http-exception.filter';
import { AuthGuard } from './application/guards/auth.guard';
import { RolesGuard } from './application/guards/role.guard';
import { HttpLoggingInterceptor } from './application/interceptors/http-logging.interceptor';
import { ResponseInterceptor } from './application/interceptors/response.interceptor';
import { ClsServiceModule } from './services/cls-store/cls-store.module';
import { DataServicesModule } from './services/data-services/data-services.module';
import { JwtServiceModule } from './services/jwt/jwt.module';
import { RedisServiceModule } from './services/redis-service/redis-service.module';
@Module({
  imports: [
    ClsServiceModule,
    JwtServiceModule,
    EventEmitterModule.forRoot({}),
    DataServicesModule,
    RedisServiceModule,
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    // routes
    RouterModule.register(routes),

    // controller modules
    ControllerModule,
    EnvironmentConfigModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ClsGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpLoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
