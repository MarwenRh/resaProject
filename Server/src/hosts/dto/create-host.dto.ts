import { IsBoolean, IsDate, IsEmail, IsNumber, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class RatingDto {
  @IsNumber()
  @IsOptional()
  count: number;

  @IsNumber()
  @IsOptional()
  average: number;
}

export class CreateHostDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  property_id: string[];

  @IsString()
  @IsOptional()
  picture: string;

  @IsString()
  @IsOptional()
  about: string;

  @IsString()
  @IsOptional()
  government_id: string;

  @IsString()
  @IsOptional()
  identity_card: string;

  @IsBoolean()
  @IsOptional()
  identity_verified: boolean;

  @IsDate()
  @IsOptional()
  birth_date: Date;

  @IsString()
  @IsOptional()
  birth_place: string;

  @ValidateNested()
  @Type(() => RatingDto)
  @IsOptional()
  rating: RatingDto;
}
