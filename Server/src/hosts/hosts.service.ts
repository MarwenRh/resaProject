import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Host } from './schemas/host.schema';
import { CreateHostDto } from './dto/create-host.dto';
import { UpdateHostDto } from './dto/update-host.dto';

@Injectable()
export class HostsService {
  constructor(@InjectModel(Host.name) private hostModel: Model<Host>) {}

  async create(createHostDto: CreateHostDto): Promise<Host> {
    const newHost = new this.hostModel(createHostDto);
    return newHost.save();
  }

  async findAll(): Promise<Host[]> {
    return this.hostModel.find().exec();
  }

  async findOne(id: string): Promise<Host> {
    const host = await this.hostModel.findById(id).exec();
    if (!host) {
      throw new NotFoundException(`Host with ID ${id} not found`);
    }
    return host;
  }
  async findOneByEmail(email: string): Promise<Host> {
    const host = await this.hostModel.findOne({ email }).exec();
    if (!host) {
      throw new NotFoundException(`Host with email ${email} not found`);
    }
    return host;
  }
  
  async update(id: string, updateHostDto: UpdateHostDto): Promise<Host> {
    const existingHost = await this.hostModel.findByIdAndUpdate(id, updateHostDto, { new: true }).exec();
    if (!existingHost) {
      throw new NotFoundException(`Host with ID ${id} not found`);
    }
    return existingHost;
  }

  async remove(id: string): Promise<void> {
    const result = await this.hostModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Host with ID ${id} not found`);
    }
  }
}
