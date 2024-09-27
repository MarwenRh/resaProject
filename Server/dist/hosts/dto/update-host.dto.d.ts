export declare class UpdateHostDto {
    readonly name?: string;
    readonly email?: string;
    readonly phone?: string;
    readonly picture?: string;
    readonly about?: string;
    readonly government_id?: string;
    readonly identity_card?: string;
    readonly identity_verified?: boolean;
    readonly birth_date?: Date;
    readonly birth_place?: string;
    readonly rating?: {
        count: number;
        average: number;
    };
    readonly property_id?: string[];
}
