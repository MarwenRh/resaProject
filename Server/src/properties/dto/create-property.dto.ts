import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class CoordinatesDto {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}

class LocationDto {
  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @ValidateNested()
  @Type(() => CoordinatesDto)
  coordinates: CoordinatesDto;
}

class ApartmentSpaceDto {
  @IsString()
  space_id: string;

  @IsString()
  type: string;

  @IsString()
  area: string;

  @IsArray()
  @IsString({ each: true })
  photos: string[];
}

class PoliciesDto {
  @IsBoolean()
  smoking: boolean;

  @IsBoolean()
  pets: boolean;

  @IsBoolean()
  parties_or_events: boolean;

  @IsString()
  check_in_start: string;

  @IsString()
  check_in_end: string;

  @IsString()
  check_out_start: string;

  @IsString()
  check_out_end: string;

  @IsString()
  quiet_hours_start: string;

  @IsString()
  quiet_hours_end: string;

  @IsString()
  cleaning_maintenance: string;

  @IsString()
  cancellation_policy: string;

  @IsBoolean()
  guests_allowed: boolean;
}

class AmenitiesDto {
  @IsBoolean()
  WiFi: boolean;

  @IsBoolean()
  Kitchen: boolean;

  @IsBoolean()
  Washer: boolean;

  @IsBoolean()
  Dryer: boolean;

  @IsBoolean()
  Free_parking: boolean;

  @IsBoolean()
  Air_conditioning: boolean;

  @IsBoolean()
  Heating: boolean;

  @IsBoolean()
  TV: boolean;

  @IsBoolean()
  Hot_tub: boolean;

  @IsBoolean()
  Pool: boolean;

  @IsBoolean()
  Gym: boolean;

  @IsBoolean()
  Elevator: boolean;

  @IsBoolean()
  Wheelchair_accessible: boolean;

  @IsBoolean()
  Pets_allowed: boolean;

  @IsBoolean()
  Breakfast: boolean;

  @IsBoolean()
  Laptop_friendly_workspace: boolean;

  @IsBoolean()
  Crib: boolean;

  @IsBoolean()
  Hair_dryer: boolean;

  @IsBoolean()
  Iron: boolean;

  @IsBoolean()
  Essentials: boolean;

  @IsBoolean()
  Smoke_alarm: boolean;

  @IsBoolean()
  Carbon_monoxide_alarm: boolean;

  @IsBoolean()
  Fire_extinguisher: boolean;

  @IsBoolean()
  First_aid_kit: boolean;

  @IsBoolean()
  Lock_on_bedroom_door: boolean;

  @IsBoolean()
  Hangers: boolean;

  @IsBoolean()
  Shampoo: boolean;

  @IsBoolean()
  Garden_or_backyard: boolean;

  @IsBoolean()
  Patio_or_balcony: boolean;

  @IsBoolean()
  BBQ_grill: boolean;
}

class ContactDto {
  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  website: string;
}

class LinksDto {
  @IsString()
  booking_com: string;

  @IsString()
  google_maps: string;
}

export class CreatePropertyDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  place: string;

  @IsString()
  description: string;

  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @IsNumber()
  tourist_tax: number;

  @IsNumber()
  max_guests: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ApartmentSpaceDto)
  apartment_spaces: ApartmentSpaceDto[];

  @ValidateNested()
  @Type(() => PoliciesDto)
  policies: PoliciesDto;

  @IsArray()
  @IsString({ each: true })
  means_of_payment: string[];

  @ValidateNested()
  @Type(() => AmenitiesDto)
  amenities: AmenitiesDto;

  @IsNumber()
  overall_rating: number;

  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto;

  @ValidateNested()
  @Type(() => LinksDto)
  links: LinksDto;

  @IsDate()
  added_date: Date;

  @IsString()
  host_id: string;

  @IsNumber()
  minimum_nights: number;

  @IsNumber()
  maximum_nights: number;

  @IsNumber()
  beds_number: number;
}
