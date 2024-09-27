import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException,Options } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { Property } from './schemas/property.schema';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Options('*')
  handleOptions() {
    return {
      'Access-Control-Allow-Origin': 'http://localhost:3001',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
  }
  @Post('/api')
  @Public()
  async create(@Body() createPropertyDto: CreatePropertyDto): Promise<Property> {
    return this.propertiesService.create(createPropertyDto);
  }
  @Public()
  @Get('/api')
  async findAll(): Promise<Property[]> {
    return this.propertiesService.findAll();
  }
  
  @Public()
  @Get('/api/:id')
  async findOne(@Param('id') id: string): Promise<Property> {
    const property = await this.propertiesService.findOne(id);
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return property;
  }

  @Put('/api/:id')
  async update(@Param('id') id: string, @Body() updatePropertyDto: CreatePropertyDto): Promise<Property> {
    const updatedProperty = await this.propertiesService.update(id, updatePropertyDto);
    if (!updatedProperty) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return updatedProperty;
  }

  @Delete('/api/:id')
  async remove(@Param('id') id: string): Promise<Property> {
    const deletedProperty = await this.propertiesService.remove(id);
    if (!deletedProperty) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return deletedProperty;
  }
  @Public()
  @Get('/api/getByType/:type')
  async getByType(@Param('type') type: string): Promise<Property[]> {
    console.log(`Received request for type: ${type}`); // Debugging statement
    const properties = await this.propertiesService.findByType(type);
    if (!properties.length) {
      throw new NotFoundException(`No properties found for type ${type}`);
    }
    return properties;
  }
  @Public()
  @Get('/api/getByDest/:dest')
  async getByDest(@Param('dest') dest: string): Promise<Property[]> {
    console.log(`Received request for dest: ${dest}`); // Debugging statement
    const properties = await this.propertiesService.findByDest(dest);
    if (!properties.length) {
      throw new NotFoundException(`No properties found for dest ${dest}`);
    }
    return properties;
  }
  @Public()
  @Get('/api/getByHostsID/:HostsID')
  async getByHostsID(@Param('HostsID') HostsID: string): Promise<Property> {
    console.log(`Received request for HostsID: ${HostsID}`); // Debugging statement
    const properties = await this.propertiesService.findByHostsID(HostsID);
    return properties;
  }

  @Public()
  @Get('/api/getImages/:id')
  async getImages(@Param('id') id: string): Promise<string[]> {
    const images = await this.propertiesService.getImages(id);
    if (!images) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return images;
  }

}
  

