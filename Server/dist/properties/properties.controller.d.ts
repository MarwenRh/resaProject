import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { Property } from './schemas/property.schema';
export declare class PropertiesController {
    private readonly propertiesService;
    constructor(propertiesService: PropertiesService);
    handleOptions(): {
        'Access-Control-Allow-Origin': string;
        'Access-Control-Allow-Methods': string;
        'Access-Control-Allow-Headers': string;
    };
    create(createPropertyDto: CreatePropertyDto): Promise<{
        property_id: string;
    }>;
    findAll(): Promise<Property[]>;
    findOne(id: string): Promise<Property>;
    update(id: string, updatePropertyDto: CreatePropertyDto): Promise<Property>;
    remove(id: string): Promise<Property>;
    getByType(type: string): Promise<Property[]>;
    getByDest(dest: string): Promise<Property[]>;
    getByHostsID(HostsID: string): Promise<Property>;
    getImages(id: string): Promise<string[]>;
}
