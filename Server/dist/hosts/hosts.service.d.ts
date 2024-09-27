import { Model } from 'mongoose';
import { Host } from './schemas/host.schema';
import { CreateHostDto } from './dto/create-host.dto';
import { UpdateHostDto } from './dto/update-host.dto';
export declare class HostsService {
    private hostModel;
    constructor(hostModel: Model<Host>);
    create(createHostDto: CreateHostDto): Promise<Host>;
    findAll(): Promise<Host[]>;
    findOne(id: string): Promise<Host>;
    findOneByEmail(email: string): Promise<Host>;
    update(id: string, updateHostDto: UpdateHostDto): Promise<Host>;
    remove(id: string): Promise<void>;
}
