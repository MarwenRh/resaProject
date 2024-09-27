declare class CoordinatesDto {
    latitude: number;
    longitude: number;
}
declare class LocationDto {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates: CoordinatesDto;
}
declare class ApartmentSpaceDto {
    space_id: string;
    type: string;
    area: string;
    photos: string[];
}
declare class PoliciesDto {
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
declare class AmenitiesDto {
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
declare class ContactDto {
    phone: string;
    email: string;
    website: string;
}
declare class LinksDto {
    booking_com: string;
    google_maps: string;
}
export declare class CreatePropertyDto {
    name: string;
    type: string;
    place: string;
    description: string;
    location: LocationDto;
    tourist_tax: number;
    max_guests: number;
    apartment_spaces: ApartmentSpaceDto[];
    policies: PoliciesDto;
    means_of_payment: string[];
    amenities: AmenitiesDto;
    overall_rating: number;
    contact: ContactDto;
    links: LinksDto;
    added_date: Date;
    host_id: string;
    minimum_nights: number;
    maximum_nights: number;
    beds_number: number;
}
export {};
