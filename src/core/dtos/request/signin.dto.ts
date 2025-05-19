import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Match } from 'src/application/decorators/match.decorator';

export class SigninDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email must be valid' })
  @Transform(({ value }) => value?.toLowerCase())
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Match('password')
  confirmPassword: string;
}

export class CheckTokenDto {
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  token: string;
}

export class CreateUpdateFirebaseToken {
  @IsOptional()
  @IsString()
  firebaseToken: string;
  @IsOptional()
  @IsString()
  adminId: string;
  @IsOptional()
  @IsString()
  deviceId: string;
}
