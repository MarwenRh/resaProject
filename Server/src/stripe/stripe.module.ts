import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule], 

  controllers: [StripeController],
  providers: [StripeService]
})
export class StripeModule {}
