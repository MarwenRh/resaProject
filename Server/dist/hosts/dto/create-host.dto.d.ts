declare class RatingDto {
    count: number;
    average: number;
}
export declare class CreateHostDto {
    name: string;
    email: string;
    phone: string;
    property_id: string[];
    picture: string;
    about: string;
    government_id: string;
    identity_card: string;
    identity_verified: boolean;
    birth_date: Date;
    birth_place: string;
    rating: RatingDto;
}
export {};
