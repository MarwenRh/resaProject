import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { HostsService } from './hosts.service';
import { CreateHostDto } from './dto/create-host.dto';
import { UpdateHostDto } from './dto/update-host.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('hosts')
export class HostsController {
  constructor(private readonly hostsService: HostsService) {}
  @Public()
  @Post('/api')
  async create(@Body() createHostDto: CreateHostDto) {
    return await this.hostsService.create(createHostDto);
  }
  @Public()
  @Get('/api')
  async findAll() {
    return await this.hostsService.findAll();
  }
  @Public()
  @Get('/api/:id')
  async findOne(@Param('id') id: string) {
    return await this.hostsService.findOne(id);
  }
  @Public()
  @Get('/api/getByEmail/:email')
  async findOneByEmail(@Param('email') email: string) {
    return await this.hostsService.findOneByEmail(email);
  }
  
  @Put('/api/:id')
  async update(@Param('id') id: string, @Body() updateHostDto: UpdateHostDto) {
    return await this.hostsService.update(id, updateHostDto);
  }

  @Delete('/api/:id')
  async remove(@Param('id') id: string) {
    return await this.hostsService.remove(id);
  }
}
