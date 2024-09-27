import { Document } from 'mongoose';
declare class Coordinates {
    latitude: number;
    longitude: number;
}
declare class Location {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates: Coordinates;
}
declare class ApartmentSpace {
    space_id: string;
    type: string;
    area: string;
    photos: string[];
}
declare class Policies {
    smoking: boolean;
    pets: boolean;
    parties_or_events: boolean;
    check_in_start: string;
    check_in_end: string;
    check_out_start: string;
    check_out_end: string;
    quiet_hours_start: string;
    quiet_hours_end: string;
    cleaning_maintenance: string;
    cancellation_policy: string;
    guests_allowed: boolean;
}
declare class Amenities {
    WiFi: boolean;
    Kitchen: boolean;
    Washer: boolean;
    Dryer: boolean;
    Free_parking: boolean;
    Air_conditioning: boolean;
    Heating: boolean;
    TV: boolean;
    Hot_tub: boolean;
    Pool: boolean;
    Gym: boolean;
    Elevator: boolean;
    Wheelchair_accessible: boolean;
    Pets_allowed: boolean;
    Breakfast: boolean;
    Laptop_friendly_workspace: boolean;
    Crib: boolean;
    Hair_dryer: boolean;
    Iron: boolean;
    Essentials: boolean;
    Smoke_alarm: boolean;
    Carbon_monoxide_alarm: boolean;
    Fire_extinguisher: boolean;
    First_aid_kit: boolean;
    Lock_on_bedroom_door: boolean;
    Hangers: boolean;
    Shampoo: boolean;
    Garden_or_backyard: boolean;
    Patio_or_balcony: boolean;
    BBQ_grill: boolean;
}
declare class Contact {
    phone: string;
    email: string;
    website: string;
}
declare class Links {
    booking_com: string;
    google_maps: string;
}
export declare class Property extends Document {
    name: string;
    url: string;
    type: string;
    place: string;
    description: string;
    location: Location;
    tourist_tax: number;
    max_guests: number;
    apartment_spaces: ApartmentSpace[];
    policies: Policies;
    means_of_payment: string[];
    amenities: Amenities;
    overall_rating: number;
    contact: Contact;
    links: Links;
    added_date: Date;
    host_id: string;
    minimum_nights: number;
    maximum_nights: number;
    beds_number: number;
}
export declare const PropertySchema: import("mongoose").Schema<Property, import("mongoose").Model<Property, any, any, any, Document<unknown, any, Property> & Property & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Property, Document<unknown, {}, import("mongoose").FlatRecord<Property>> & import("mongoose").FlatRecord<Property> & Required<{
    _id: unknown;
}>>;
export {};
