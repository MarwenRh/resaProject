import { IsString, IsNumber, IsOptional, IsBoolean, IsDate, IsArray, IsObject } from 'class-validator';

export class UpdateHostDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly phone?: string;

  @IsString()
  @IsOptional()
  readonly picture?: string;

  @IsString()
  @IsOptional()
  readonly about?: string;

  @IsString()
  @IsOptional()
  readonly government_id?: string;

  @IsString()
  @IsOptional()
  readonly identity_card?: string;

  @IsBoolean()
  @IsOptional()
  readonly identity_verified?: boolean;

  @IsDate()
  @IsOptional()
  readonly birth_date?: Date;

  @IsString()
  @IsOptional()
  readonly birth_place?: string;

  @IsObject()
  @IsOptional()
  readonly rating?: {
    count: number;
    average: number;
  };

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly property_id?: string[];
}
