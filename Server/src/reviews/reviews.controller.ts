import { Controller, Post, Get, Param, Body, Put, Delete, NotFoundException } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './schemas/review.schema';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('/api')
  async create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }
  @Public()
  @Get('/api')
  async findAll() {
    return this.reviewsService.findAll();
  }
  @Public()
  @Get('/api/:id')
  async findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }

  @Put('/api/:id')
  async update(@Param('id') id: string, @Body() updateReviewDto: CreateReviewDto) {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Delete('/api/:id')
  async remove(@Param('id') id: string) {
    return this.reviewsService.remove(id);
  }
  @Public()
  @Get('/api/propertyById/:id')
  async getReviewsByPropertyId(@Param('id') propertyId: string): Promise<Review[]> {
    try {
      return await this.reviewsService.getReviewsByPropertyId(propertyId);
    } catch (err) {
      throw new NotFoundException('Error fetching Reviews data');
    }
  }
}
