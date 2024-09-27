import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class Coordinates {
  @Prop()
  latitude: number;

  @Prop()
  longitude: number;
}

const CoordinatesSchema = SchemaFactory.createForClass(Coordinates);

@Schema()
class Location {

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;

  @Prop({ type: CoordinatesSchema })
  coordinates: Coordinates;
}

const LocationSchema = SchemaFactory.createForClass(Location);

@Schema()
class ApartmentSpace {
  @Prop()
  space_id: string;

  @Prop()
  type: string;

  @Prop()
  area: string;

  @Prop([String])
  photos: string[];
}

const ApartmentSpaceSchema = SchemaFactory.createForClass(ApartmentSpace);

@Schema()
class Policies {
  @Prop()
  smoking: boolean;

  @Prop()
  pets: boolean;

  @Prop()
  parties_or_events: boolean;

  @Prop()
  check_in_start: string;

  @Prop()
  check_in_end: string;

  @Prop()
  check_out_start: string;

  @Prop()
  check_out_end: string;

  @Prop()
  quiet_hours_start: string;

  @Prop()
  quiet_hours_end: string;

  @Prop()
  cleaning_maintenance: string;

  @Prop()
  cancellation_policy: string;

  @Prop()
  guests_allowed: boolean;
}

const PoliciesSchema = SchemaFactory.createForClass(Policies);

@Schema()
class Amenities {
  @Prop()
  WiFi: boolean;

  @Prop()
  Kitchen: boolean;

  @Prop()
  Washer: boolean;

  @Prop()
  Dryer: boolean;

  @Prop()
  Free_parking: boolean;

  @Prop()
  Air_conditioning: boolean;

  @Prop()
  Heating: boolean;

  @Prop()
  TV: boolean;

  @Prop()
  Hot_tub: boolean;

  @Prop()
  Pool: boolean;

  @Prop()
  Gym: boolean;

  @Prop()
  Elevator: boolean;

  @Prop()
  Wheelchair_accessible: boolean;

  @Prop()
  Pets_allowed: boolean;

  @Prop()
  Breakfast: boolean;

  @Prop()
  Laptop_friendly_workspace: boolean;

  @Prop()
  Crib: boolean;

  @Prop()
  Hair_dryer: boolean;

  @Prop()
  Iron: boolean;

  @Prop()
  Essentials: boolean;

  @Prop()
  Smoke_alarm: boolean;

  @Prop()
  Carbon_monoxide_alarm: boolean;

  @Prop()
  Fire_extinguisher: boolean;

  @Prop()
  First_aid_kit: boolean;

  @Prop()
  Lock_on_bedroom_door: boolean;

  @Prop()
  Hangers: boolean;

  @Prop()
  Shampoo: boolean;

  @Prop()
  Garden_or_backyard: boolean;

  @Prop()
  Patio_or_balcony: boolean;

  @Prop()
  BBQ_grill: boolean;
}

const AmenitiesSchema = SchemaFactory.createForClass(Amenities);

@Schema()
class Contact {
  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  website: string;
}

const ContactSchema = SchemaFactory.createForClass(Contact);

@Schema()
class Links {
  @Prop()
  booking_com: string;

  @Prop()
  google_maps: string;
}

const LinksSchema = SchemaFactory.createForClass(Links);

@Schema()
export class Property extends Document {
  @Prop()
  name: string;

 @Prop()
  url: string;

  @Prop()
  type: string;

  @Prop()
  place: string;

  @Prop()
  description: string;

  @Prop({ type: LocationSchema })
  location: Location;

  @Prop()
  tourist_tax: number;

  @Prop()
  max_guests: number;

  @Prop({ type: [ApartmentSpaceSchema] })
  apartment_spaces: ApartmentSpace[];

  @Prop({ type: PoliciesSchema })
  policies: Policies;

  @Prop([String])
  means_of_payment: string[];

  @Prop({ type: AmenitiesSchema })
  amenities: Amenities;

  @Prop()
  overall_rating: number;

  @Prop({ type: ContactSchema })
  contact: Contact;

  @Prop({ type: LinksSchema })
  links: Links;

  @Prop()
  added_date: Date;

  @Prop()
  host_id: string;

  @Prop()
  minimum_nights: number;

  @Prop()
  maximum_nights: number;

  @Prop()
  beds_number: number;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
