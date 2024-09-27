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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeController = void 0;
const common_1 = require("@nestjs/common");
const stripe_service_1 = require("./stripe.service");
const public_decorator_1 = require("../auth/decorators/public.decorator");
let StripeController = class StripeController {
    constructor(stripeService) {
        this.stripeService = stripeService;
    }
    async createCheckoutSession(body) {
        const { totalPrice, property_id, user_id, checkInDate, checkOutDate, adult_guests, minor_guests, paymentMethodTypes, successUrl, cancelUrl, } = body;
        const session = await this.stripeService.createCheckoutSession(totalPrice, property_id, paymentMethodTypes, successUrl, cancelUrl, user_id, checkInDate, checkOutDate, minor_guests, adult_guests);
        return { url: session.url };
    }
    async handleWebhook(req, res, signature) {
        try {
            const event = this.stripeService.constructEvent(req.body, signature);
            console.log('Received event from Stripe:', event.type);
            await this.stripeService.handleEvent(event);
            res.status(200).send('Webhook received');
        }
        catch (err) {
            console.error('Webhook handling error:', err.message);
            res.status(400).send(`Webhook Error: ${err.message}`);
        }
    }
};
exports.StripeController = StripeController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('create-checkout-session'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "createCheckoutSession", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Headers)('stripe-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "handleWebhook", null);
exports.StripeController = StripeController = __decorate([
    (0, common_1.Controller)('stripe'),
    __metadata("design:paramtypes", [stripe_service_1.StripeService])
], StripeController);
//# sourceMappingURL=stripe.controller.js.map