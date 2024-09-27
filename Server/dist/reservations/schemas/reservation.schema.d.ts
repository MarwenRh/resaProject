import { Document } from 'mongoose';
export declare class Reservation extends Document {
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
export declare const ReservationSchema: import("mongoose").Schema<Reservation, import("mongoose").Model<Reservation, any, any, any, Document<unknown, any, Reservation> & Reservation & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Reservation, Document<unknown, {}, import("mongoose").FlatRecord<Reservation>> & import("mongoose").FlatRecord<Reservation> & Required<{
    _id: unknown;
}>>;
