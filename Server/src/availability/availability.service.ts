import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Availability } from './schemas/availability.schema';
import { CreateAvailabilityDto } from './dto/create-availability.dto';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectModel(Availability.name) private availabilityModel: Model<Availability>,
  ) {}

  async create(createAvailabilityDto: CreateAvailabilityDto): Promise<Availability> {
    const createdAvailability = new this.availabilityModel(createAvailabilityDto);
    return createdAvailability.save();
  }

  async findAll(): Promise<Availability[]> {
    return this.availabilityModel.find().exec();
  }

  async findOne(id: string): Promise<Availability> {
    const availability = await this.availabilityModel.findById(id).exec();
    if (!availability) {
      throw new NotFoundException(`Availability with ID ${id} not found`);
    }
    return availability;
  }

  async update(id: string, updateAvailabilityDto: CreateAvailabilityDto): Promise<Availability> {
    const updatedAvailability = await this.availabilityModel.findByIdAndUpdate(id, updateAvailabilityDto, { new: true });
    if (!updatedAvailability) {
      throw new NotFoundException(`Availability with ID ${id} not found`);
    }
    return updatedAvailability;
  }

  async remove(id: string): Promise<Availability> {
    const deletedAvailability = await this.availabilityModel.findByIdAndDelete(id);
    if (!deletedAvailability) {
      throw new NotFoundException(`Availability with ID ${id} not found`);
    }
    return deletedAvailability;
  }
  async getAvailabilityByPropertyId(propertyId: string): Promise<Availability[]> {
    try {
      const availabilityEntries = await this.availabilityModel.find({ property_id: propertyId }).exec();
      
      if (availabilityEntries.length === 0) {
        throw new NotFoundException('Availability entries not found');
      }

      return availabilityEntries;
    } catch (err) {
      console.error('Error fetching Availability entries:', err);
      throw new Error('Error fetching Availability entries');
    }
  }
  async getAvgPriceByPropertyId(propertyId: string): Promise<number> {
    try {
      // Recherchez toutes les disponibilités pour la propriété donnée
      const availabilityEntries = await this.availabilityModel.find({ property_id: propertyId }).exec();
  
      // Si aucune entrée n'est trouvée, lancez une exception
      if (availabilityEntries.length === 0) {
        throw new NotFoundException('No availability entries found for the given property ID');
      }
  
      let totalPrices = 0;
      let totalSlots = 0;
  
      // Parcourir les entrées de disponibilité et accumuler les prix et les slots
      availabilityEntries.forEach(entry => {
        entry.available_slots.forEach(slot => {
          // Vérifiez si le prix est une chaîne numérique et convertissez-le en nombre
          const price = parseFloat(slot.price);
          if (!isNaN(price)) {
            totalPrices += price;
            totalSlots++;
          }
        });
      });
  
      if (totalSlots === 0) {
        throw new Error('No valid prices found for the given property ID');
      }
  
      // Calculez la moyenne
      const avgPrice = totalPrices / totalSlots;
  
      return avgPrice;
    } catch (err) {
      console.error('Error calculating average price:', err);
      throw new Error('Error calculating average price');
    }
  }
  
}
