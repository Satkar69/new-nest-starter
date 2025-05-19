import { Injectable, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';
import { IRedisService } from 'src/core/abstracts/redis/redis.abstract';

@Injectable()
export class RedisService implements IRedisService {
  private redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT) || 6379,
      commandTimeout: 5000,
      autoResubscribe: true,
      reconnectOnError: (error) => {
        Logger.error('Error occurred while reconnecting to redis', error);
        return true;
      },
    });
  }
  async hincrby(key: string, field: string, increment: number): Promise<number> {
    try {
      return await this.redisClient.hincrby(key, field, increment);
    } catch (err) {
      console.log(err);
    }
  }
  async hincrbyfloat(key: string, field: string, increment: number): Promise<number> {
    return parseFloat(await this.redisClient.hincrbyfloat(key, field, increment));
  }
  async hget(key: string, field: string): Promise<string | null> {
    return await this.redisClient.hget(key, field);
  }
  async hset(key: string, value: any): Promise<number> {
    try {
      return await this.redisClient.hset(key, value);
    } catch (err) {
      console.log('error in hset', err);
    }
  }

  async hmset(key: string, data: { [key: string]: any }): Promise<boolean> {
    return (await this.redisClient.hmset(key, data)) === 'OK';
  }
  async hkeys(key: string): Promise<string[]> {
    return await this.redisClient.hkeys(key);
  }
  async hgetall(key: string): Promise<{ [key: string]: string }> {
    return await this.redisClient.hgetall(key);
  }
  async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }
  async set(key: string, value: string): Promise<boolean> {
    const val = await this.redisClient.set(key, value);
    return val === 'OK';
  }
  async del(key: string): Promise<number> {
    const val = await this.redisClient.del(key);
    return val;
  }
  async keys(pattern: string): Promise<string[]> {
    return await this.redisClient.keys(pattern);
  }
  async expire(key: string, seconds: number): Promise<boolean> {
    const val = await this.redisClient.expire(key, seconds);
    return val === 1;
  }

  async setex(key: string, seconds: number, value: string): Promise<boolean> {
    const val = await this.redisClient.setex(key, seconds, value);
    return val === 'OK';
  }
}
