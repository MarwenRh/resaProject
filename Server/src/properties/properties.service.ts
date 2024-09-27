import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property } from './schemas/property.schema';
import { CreatePropertyDto } from './dto/create-property.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<Property>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const createdProperty = new this.propertyModel(createPropertyDto);
    return createdProperty.save();
  }

  async findAll(): Promise<Property[]> {
    return this.propertyModel.find().exec();
  }

  async findOne(id: string): Promise<Property> {
    const property = await this.propertyModel.findById(id).exec();
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return property;
  }

  async update(id: string, updatePropertyDto: CreatePropertyDto): Promise<Property> {
    const updatedProperty = await this.propertyModel.findByIdAndUpdate(id, updatePropertyDto, { new: true });
    if (!updatedProperty) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return updatedProperty;
  }

  async remove(id: string): Promise<Property> {
    const deletedProperty = await this.propertyModel.findByIdAndDelete(id);
    if (!deletedProperty) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return deletedProperty;
  }
  async getImages(id: string): Promise<string[]> {
    const property = await this.propertyModel.findById(id).exec();
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    const allPhotos = property.apartment_spaces.reduce((acc, space) => {
      return acc.concat(space.photos);
    }, []);
    return allPhotos;
  }

  
  async findByDest(dest: string): Promise<Property[]> {
    const regex = new RegExp(`^${dest}$`, 'i'); // Case-insensitive exact match
    return this.propertyModel.find({ 'location.city': { $regex: regex } }).exec();
  }
  async findByHostsID(host_id: string): Promise<Property> {
    return this.propertyModel.findOne({ host_id}).exec();
  }
  async findByType(type: string): Promise<Property[]> {
    return this.propertyModel.find({ type }).exec();
  }

}
