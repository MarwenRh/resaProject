import { Document } from 'mongoose';
declare class Rating {
    count: number;
    average: number;
}
export declare class Host extends Document {
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
    rating: Rating;
}
export declare const HostSchema: import("mongoose").Schema<Host, import("mongoose").Model<Host, any, any, any, Document<unknown, any, Host> & Host & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Host, Document<unknown, {}, import("mongoose").FlatRecord<Host>> & import("mongoose").FlatRecord<Host> & Required<{
    _id: unknown;
}>>;
export {};
