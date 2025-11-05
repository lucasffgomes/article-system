import { IsOptional, IsString, MinLength, IsArray, IsNumber } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  readonly password?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  readonly permissionIds?: number[];
}
