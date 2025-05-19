import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Matches, ValidateNested } from 'class-validator';
import { Match } from 'src/application/decorators/match.decorator';
import { IPaginationQuery } from 'src/common/interface/response/interface/pagination.options.interface';

export class CreateAdminDto {
  @IsString()
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @Transform(({ value }) => value?.trim()?.toLowerCase())
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'password too weak',
  })
  password: string;

  avatar: string;
}

export class UpdateAdminDto {
  @IsString()
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  name: string;
  @IsOptional()
  accountNumber?: string;
  avatar: string;
}

export class UpdateAdminPasswordDto {
  @IsNotEmpty()
  adminId: string;

  @IsString()
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'password too weak',
  })
  newPassword: string;
}

export class DiscountOnBrandCreateDto {
  @IsString()
  @IsNotEmpty()
  brandId: string;

  @IsInt()
  @IsNotEmpty()
  discountRate: number;
}

export class DiscountOnBrandUpdateDto {
  @IsString()
  @IsNotEmpty()
  discountOnBrandId: string;

  @IsInt()
  @IsNotEmpty()
  discountRate: string;
}

export class DiscountOnBrandDeleteDto {
  @IsString()
  @IsNotEmpty()
  discountOnBrandId: string;
}

export class FixedPriceCreateDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsInt()
  @IsNotEmpty()
  price: number;
}

export class FixedPriceUpdateDto {
  @IsString()
  @IsNotEmpty()
  fixedPriceId: string;

  @IsInt()
  @IsNotEmpty()
  price: string;
}

export class FixedPriceDeleteDto {
  @IsString()
  @IsNotEmpty()
  fixedPriceId: string;
}

export class DiscountOnBrandDto {
  @IsOptional()
  @ValidateNested({ each: true })
  create: DiscountOnBrandCreateDto[];
  @IsOptional()
  @ValidateNested({ each: true })
  update: DiscountOnBrandUpdateDto[];
  @IsOptional()
  @ValidateNested({ each: true })
  delete: DiscountOnBrandDeleteDto[];
}

export class FixedPriceDto {
  @IsOptional()
  @ValidateNested({ each: true })
  create: FixedPriceCreateDto[];
  @IsOptional()
  @ValidateNested({ each: true })
  update: FixedPriceUpdateDto[];
  @IsOptional()
  @ValidateNested({ each: true })
  delete: FixedPriceDeleteDto[];
}

export class AdminTagCreateDto {
  @IsString()
  @IsNotEmpty()
  tagId: string;
}

export class AdminTagDeleteDto {
  @IsString()
  @IsNotEmpty()
  adminTagId: string;
}

export class AdminTagDto {
  @IsOptional()
  @ValidateNested({ each: true })
  create: AdminTagCreateDto[];
  @IsOptional()
  @ValidateNested({ each: true })
  delete: AdminTagDeleteDto[];
}

export class CreateUpdateAdminDto {
  @IsOptional()
  replicationId: string;

  @IsOptional()
  adminId: string;

  @IsString()
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @Transform(({ value }) => value?.trim()?.toLowerCase())
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  businessName: string;

  @IsOptional()
  abn: string;

  @IsNotEmpty()
  contactNumber: string;

  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'password too weak',
  })
  password: string;

  @IsOptional()
  avatar: string;

  @IsOptional()
  discountOnBrand: DiscountOnBrandDto;

  @IsOptional()
  fixedPrice: FixedPriceDto;

  @IsOptional()
  accountNumber: string;

  @IsOptional()
  tags: AdminTagDto;

  @IsOptional()
  expressFreightFixedPrice: number;
}

export class CreateShippingAddressDto {
  @IsOptional()
  addressId: string;

  @IsString()
  @IsNotEmpty()
  contactName: string;

  @IsNotEmpty()
  streetAddress: string;

  @IsString()
  @Matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, {
    message: 'Invalid phone number format',
  })
  contactNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsBoolean()
  isPrimary: boolean;

  @IsString()
  @Matches(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/, {
    message: 'Invalid latitude format',
  })
  latitude: string;

  @IsString()
  @Matches(/^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/, {
    message: 'Invalid longitude format',
  })
  longitude: string;

  @IsOptional()
  shippingThresholdId: string;

  @IsOptional()
  state: string;

  @IsOptional()
  countryCode: string;

  @IsOptional()
  businessName: string;
}

export class AdminSearchDto extends IPaginationQuery {
  @IsOptional()
  @IsString()
  search: string;
}

export class loginAsAdminDto {
  @IsNotEmpty()
  @IsString()
  adminId: string;
}

export class PasswordResetDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class TokenCheckDto {
  @IsNotEmpty()
  token: string;
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
