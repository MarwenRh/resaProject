import { Module } from '@nestjs/common';
import { HostsService } from './hosts.service';
import { HostsController } from './hosts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Host, HostSchema } from './schemas/host.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Host.name, schema: HostSchema, collection: 'Hosts' }]),
  ],
  providers: [HostsService],
  controllers: [HostsController]
})
export class HostsModule {}
