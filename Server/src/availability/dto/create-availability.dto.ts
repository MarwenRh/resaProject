import { Type } from 'class-transformer';
import { IsArray, IsDate, IsOptional, IsString, ValidateNested } from 'class-validator';

class SlotDto {
  @IsDate()
  start_time: Date;

  @IsDate()
  end_time: Date;

  @IsString()
  @IsOptional()
  price: string;
}

export class CreateAvailabilityDto {
  @IsString()
  property_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SlotDto)
  @IsOptional()
  available_slots: SlotDto[];
}
