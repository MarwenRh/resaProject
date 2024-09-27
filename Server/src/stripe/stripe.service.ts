import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private readonly endpointSecret: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService, // Inject ConfigService
  ) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-06-20',
    });
    this.endpointSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET'); // Get webhook secret from env
  }


  // Function to create Stripe checkout session
  async createCheckoutSession(
    totalPrice: number,
    property_id: string,
    paymentMethodTypes: Stripe.Checkout.SessionCreateParams.PaymentMethodType[],
    successUrl: string,
    cancelUrl: string,
    user_id: string,
    checkInDate: string,
    checkOutDate: string,
    adult_guests: number,
    minor_guests: number
    
  ) {
    console.log('Creating checkout session with the following data:', {
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
    });

    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: paymentMethodTypes,
        line_items: [
          {
            
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Booking for Property ${property_id}`,
              },
              unit_amount: totalPrice * 100, // Stripe expects amounts in cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        payment_intent_data: {
            metadata: {
              property_id: property_id,
              user_id: user_id,
              checkInDate:checkInDate,
              checkOutDate:checkOutDate,
              adult_guests:adult_guests,
              minor_guests:minor_guests
            }
          },
      
      });

      console.log('Checkout session created successfully:', session.id);
      return session;
    } catch (error) {
      console.error(`Stripe Checkout error: ${error.message}`);
      throw new Error(`Stripe Checkout error: ${error.message}`);
    }
  }

  // Function to handle webhooks and reservation creation
  async handleEvent(event: Stripe.Event) {
    console.log('Received webhook event:', event.type);

    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log('Handling payment_intent.succeeded event');
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('PaymentIntent data:', paymentIntent);
        await this.createReservation(paymentIntent); // Call the reservation API here
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }

  // Construct event for webhook verification
  constructEvent(body: Buffer, signature: string): Stripe.Event {
    try {
      const event = this.stripe.webhooks.constructEvent(body, signature, this.endpointSecret);
      return event;
    } catch (error) {
      throw new Error(`Webhook Error: ${error.message}`);
    }
  }

  // Make a POST request to the reservation API
  private async createReservation(paymentIntent: Stripe.PaymentIntent) {
    console.log('Creating reservation for PaymentIntent:', paymentIntent.id);
console.log('my test for property id :',paymentIntent.metadata.property_id)
    const property_id = paymentIntent.metadata.property_id;
    const user_id = paymentIntent.metadata.user_id;
    const total_price = paymentIntent.amount_received / 100; // Convert from cents to dollars
    const check_in_date = paymentIntent.metadata.checkInDate;
    const check_out_date = paymentIntent.metadata.checkOutDate;
    const status=paymentIntent.status;
    const adult_guests = parseInt(paymentIntent.metadata.adult_guests || '0', 10); // Ensure guests is parsed as a number
    const minor_guests = parseInt(paymentIntent.metadata.adult_guests || '0', 10); // Ensure guests is parsed as a number


    const reservationData = {
      property_id,
      user_id,
      total_price,
      check_in_date,
      check_out_date,
      adult_guests,
      minor_guests,
      status
    };

    console.log('Reservation data to be sent to API:', reservationData);

    try {
      const response = await lastValueFrom(
        this.httpService.post('http://localhost:3000/reservations/api', reservationData)
      );
      console.log('Reservation created successfully:', response.data);
    } catch (error) {
      console.error('Failed to create reservation:', error.message);
    }
  }
}
