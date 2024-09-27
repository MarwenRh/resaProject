declare class SlotDto {
    start_time: Date;
    end_time: Date;
    price: string;
}
export declare class CreateAvailabilityDto {
    property_id: string;
    available_slots: SlotDto[];
}
export {};
