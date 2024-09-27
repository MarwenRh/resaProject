import { Model } from 'mongoose';
import { Property } from './schemas/property.schema';
import { CreatePropertyDto } from './dto/create-property.dto';
export declare class PropertiesService {
    private propertyModel;
    constructor(propertyModel: Model<Property>);
    create(createPropertyDto: CreatePropertyDto): Promise<Property>;
    findAll(): Promise<Property[]>;
    findOne(id: string): Promise<Property>;
    update(id: string, updatePropertyDto: CreatePropertyDto): Promise<Property>;
    remove(id: string): Promise<Property>;
    getImages(id: string): Promise<string[]>;
    findByDest(dest: string): Promise<Property[]>;
    findByHostsID(host_id: string): Promise<Property>;
    findByType(type: string): Promise<Property[]>;
}
