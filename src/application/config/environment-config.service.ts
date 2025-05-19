import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/core/config/database.interface';
import { JWTConfig } from 'src/core/config/jwt.interface';
import { DefaultSuperAdminConfig } from 'src/core/config/superadmin.interface';
import { UploadFileConfig } from 'src/core/config/upload.interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig, JWTConfig, DefaultSuperAdminConfig, UploadFileConfig {
  constructor(private configService: ConfigService) {}

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  }

  getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
  }

  getJwtRefreshExpirationTime(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
  }

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  getDatabaseCa(): string {
    return this.configService.get<string>('DATABASE_CA');
  }

  getDatabaseSchema(): string {
    return this.configService.get<string>('DATABASE_SCHEMA');
  }

  getDatabaseSync(): boolean {
    return this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
  }

  getDefaultAdminName(): string {
    return this.configService.get<string>('ADMIN_NAME');
  }

  getDefaultAdminLastName(): string {
    return this.configService.get<string>('ADMIN_LAST_NAME');
  }

  getDefaultAdminEmail(): string {
    return this.configService.get<string>('ADMIN_EMAIL');
  }

  getDefaultAdminPassword(): string {
    return this.configService.get<string>('ADMIN_PASSWORD');
  }

  getDefaultAdminAvatar(): string {
    return this.configService.get<string>('ADMIN_AVATAR');
  }

  /**
   * File upload configuration
   */
  getBucketAccessKey(): string {
    return this.configService.get<string>('AWS_ACCESS_KEY_ID');
  }
  getBucketAccessSecret(): string {
    return this.configService.get<string>('AWS_ACCESS_SECRET');
  }
  getBucketRegion(): string {
    return this.configService.get<string>('AWS_S3_REGION');
  }
  getBucketName(): string {
    return this.configService.get<string>('AWS_S3_BUCKET');
  }

  /**
   * Email configuration
   */
  getEmailHost(): string {
    return this.configService.get<string>('MAIL_HOST');
  }

  getEmailUser(): string {
    return this.configService.get<string>('MAIL_USER');
  }

  getEmailPassword(): string {
    return this.configService.get<string>('MAIL_PASSWORD');
  }

  getEmailFrom(): string {
    return this.configService.get<string>('MAIL_FROM');
  }

  getEmailPort(): number {
    return this.configService.get<number>('MAIL_PORT');
  }
}
