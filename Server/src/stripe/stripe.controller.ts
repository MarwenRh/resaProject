import { Controller, Post, Body, Req, Res, Headers } from '@nestjs/common';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';
import { Request, Response } from 'express';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}
  @Public()
  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body() body: {
      totalPrice: number;
      property_id: string;
      user_id: string;
      checkInDate: string;
      checkOutDate: string;
      minor_guests: number;
      adult_guests:number;
      paymentMethodTypes: Stripe.Checkout.SessionCreateParams.PaymentMethodType[];
      successUrl: string;
      cancelUrl: string;
      
    }
  ) {
    const {
      totalPrice,
      property_id,
      user_id,
      checkInDate,
      checkOutDate,
      adult_guests,
      minor_guests,
      paymentMethodTypes,
      successUrl,
      cancelUrl,
    } = body;

    const session = await this.stripeService.createCheckoutSession(
      totalPrice,
      property_id,
      paymentMethodTypes,
      successUrl,
      cancelUrl,
      user_id,
      checkInDate,
      checkOutDate,
      minor_guests,
      adult_guests
    );

    return { url: session.url };
  }
  @Public()
  @Post('webhook')
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') signature: string
  ) {
    try {
      const event = this.stripeService.constructEvent(req.body, signature);

      console.log('Received event from Stripe:', event.type); // Log event type

      await this.stripeService.handleEvent(event);

      res.status(200).send('Webhook received');
    } catch (err) {
      console.error('Webhook handling error:', err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
}
