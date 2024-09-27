export declare class CreateReservationDto {
    user_id: string;
    property_id: string;
    check_in_date: Date;
    check_out_date: Date;
    total_price: number;
    status: string;
    adult_guests: number;
    minor_guests: number;
    message: string;
    cancellation_policy: string;
}
