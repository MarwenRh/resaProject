import { Document } from 'mongoose';
declare class Slot {
    start_time: Date;
    end_time: Date;
    price: string;
}
export declare class Availability extends Document {
    property_id: string;
    available_slots: Slot[];
}
export declare const AvailabilitySchema: import("mongoose").Schema<Availability, import("mongoose").Model<Availability, any, any, any, Document<unknown, any, Availability> & Availability & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Availability, Document<unknown, {}, import("mongoose").FlatRecord<Availability>> & import("mongoose").FlatRecord<Availability> & Required<{
    _id: unknown;
}>>;
export {};
