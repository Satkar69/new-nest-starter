import { Global, Module } from '@nestjs/common';
import { IRedisService } from 'src/core/abstracts/redis/redis.abstract';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [
    {
      provide: IRedisService,
      useClass: RedisService,
    },
  ],
  exports: [IRedisService],
})
export class RedisServiceModule {}
