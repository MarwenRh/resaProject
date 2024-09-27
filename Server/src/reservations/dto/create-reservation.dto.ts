import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  user_id: string;

  @IsString()
  property_id: string;

  @IsDate()
  @IsOptional()
  check_in_date: Date;

  @IsDate()
  @IsOptional()
  check_out_date: Date;

  @IsNumber()
  @IsOptional()
  total_price: number;

  @IsString()
  @IsOptional()
  status: string;

  @IsNumber()
  @IsOptional()
  adult_guests: number;

  @IsNumber()
  @IsOptional()
  minor_guests: number;

  @IsString()
  @IsOptional()
  message: string;

  @IsString()
  @IsOptional()
  cancellation_policy: string;
}
