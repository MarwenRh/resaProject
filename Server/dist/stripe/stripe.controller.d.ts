import { StripeService } from './stripe.service';
import Stripe from 'stripe';
import { Request, Response } from 'express';
export declare class StripeController {
    private readonly stripeService;
    constructor(stripeService: StripeService);
    createCheckoutSession(body: {
        totalPrice: number;
        property_id: string;
        user_id: string;
        checkInDate: string;
        checkOutDate: string;
        minor_guests: number;
        adult_guests: number;
        paymentMethodTypes: Stripe.Checkout.SessionCreateParams.PaymentMethodType[];
        successUrl: string;
        cancelUrl: string;
    }): Promise<{
        url: string;
    }>;
    handleWebhook(req: Request, res: Response, signature: string): Promise<void>;
}
