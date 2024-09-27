import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { Availability } from './schemas/availability.schema';
export declare class AvailabilityController {
    private readonly availabilityService;
    constructor(availabilityService: AvailabilityService);
    create(createAvailabilityDto: CreateAvailabilityDto): Promise<Availability>;
    findAll(): Promise<Availability[]>;
    findOne(id: string): Promise<Availability>;
    getAvailabilityByPropertyId(propertyId: string): Promise<Availability[]>;
    getAvgPriceByPropertyId(propertyId: string): Promise<number>;
    update(id: string, updateAvailabilityDto: CreateAvailabilityDto): Promise<Availability>;
    remove(id: string): Promise<Availability>;
}
