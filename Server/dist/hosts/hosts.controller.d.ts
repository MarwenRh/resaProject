import { HostsService } from './hosts.service';
import { CreateHostDto } from './dto/create-host.dto';
import { UpdateHostDto } from './dto/update-host.dto';
export declare class HostsController {
    private readonly hostsService;
    constructor(hostsService: HostsService);
    create(createHostDto: CreateHostDto): Promise<import("./schemas/host.schema").Host>;
    findAll(): Promise<import("./schemas/host.schema").Host[]>;
    findOne(id: string): Promise<import("./schemas/host.schema").Host>;
    findOneByEmail(email: string): Promise<import("./schemas/host.schema").Host>;
    update(id: string, updateHostDto: UpdateHostDto): Promise<import("./schemas/host.schema").Host>;
    remove(id: string): Promise<void>;
}
