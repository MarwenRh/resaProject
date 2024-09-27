import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}
  @Public()
  @Post('/api')
  async create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }
  @Public()
  @Get('/api')
  async findAll() {
    return this.reservationsService.findAll();
  }
  @Public()
  @Get('/api/:id')
  async findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Put('/api/:id')
  async update(@Param('id') id: string, @Body() updateReservationDto: CreateReservationDto) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete('/api/:id')
  async remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
