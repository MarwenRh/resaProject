"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const stripe_1 = require("stripe");
let StripeService = class StripeService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        const stripeSecretKey = this.configService.get('STRIPE_SECRET_KEY');
        this.stripe = new stripe_1.default(stripeSecretKey, {
            apiVersion: '2024-06-20',
        });
        this.endpointSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
    }
    async createCheckoutSession(totalPrice, property_id, paymentMethodTypes, successUrl, cancelUrl, user_id, checkInDate, checkOutDate, adult_guests, minor_guests) {
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
                            unit_amount: totalPrice * 100,
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
                        checkInDate: checkInDate,
                        checkOutDate: checkOutDate,
                        adult_guests: adult_guests,
                        minor_guests: minor_guests
                    }
                },
            });
            console.log('Checkout session created successfully:', session.id);
            return session;
        }
        catch (error) {
            console.error(`Stripe Checkout error: ${error.message}`);
            throw new Error(`Stripe Checkout error: ${error.message}`);
        }
    }
    async handleEvent(event) {
        console.log('Received webhook event:', event.type);
        switch (event.type) {
            case 'payment_intent.succeeded':
                console.log('Handling payment_intent.succeeded event');
                const paymentIntent = event.data.object;
                console.log('PaymentIntent data:', paymentIntent);
                await this.createReservation(paymentIntent);
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    }
    constructEvent(body, signature) {
        try {
            const event = this.stripe.webhooks.constructEvent(body, signature, this.endpointSecret);
            return event;
        }
        catch (error) {
            throw new Error(`Webhook Error: ${error.message}`);
        }
    }
    async createReservation(paymentIntent) {
        console.log('Creating reservation for PaymentIntent:', paymentIntent.id);
        console.log('my test for property id :', paymentIntent.metadata.property_id);
        const property_id = paymentIntent.metadata.property_id;
        const user_id = paymentIntent.metadata.user_id;
        const total_price = paymentIntent.amount_received / 100;
        const check_in_date = paymentIntent.metadata.checkInDate;
        const check_out_date = paymentIntent.metadata.checkOutDate;
        const status = paymentIntent.status;
        const adult_guests = parseInt(paymentIntent.metadata.adult_guests || '0', 10);
        const minor_guests = parseInt(paymentIntent.metadata.adult_guests || '0', 10);
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
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.post('http://localhost:3000/reservations/api', reservationData));
            console.log('Reservation created successfully:', response.data);
        }
        catch (error) {
            console.error('Failed to create reservation:', error.message);
        }
    }
};
exports.StripeService = StripeService;
exports.StripeService = StripeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], StripeService);
//# sourceMappingURL=stripe.service.js.map