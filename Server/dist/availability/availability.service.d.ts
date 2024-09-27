import { Model } from 'mongoose';
import { Availability } from './schemas/availability.schema';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
export declare class AvailabilityService {
    private availabilityModel;
    constructor(availabilityModel: Model<Availability>);
    create(createAvailabilityDto: CreateAvailabilityDto): Promise<Availability>;
    findAll(): Promise<Availability[]>;
    findOne(id: string): Promise<Availability>;
    update(id: string, updateAvailabilityDto: CreateAvailabilityDto): Promise<Availability>;
    remove(id: string): Promise<Availability>;
    getAvailabilityByPropertyId(propertyId: string): Promise<Availability[]>;
    getAvgPriceByPropertyId(propertyId: string): Promise<number>;
}
