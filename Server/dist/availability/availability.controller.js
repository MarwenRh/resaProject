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
exports.AvailabilityController = void 0;
const common_1 = require("@nestjs/common");
const availability_service_1 = require("./availability.service");
const create_availability_dto_1 = require("./dto/create-availability.dto");
const public_decorator_1 = require("../auth/decorators/public.decorator");
let AvailabilityController = class AvailabilityController {
    constructor(availabilityService) {
        this.availabilityService = availabilityService;
    }
    async create(createAvailabilityDto) {
        return this.availabilityService.create(createAvailabilityDto);
    }
    async findAll() {
        return this.availabilityService.findAll();
    }
    async findOne(id) {
        return this.availabilityService.findOne(id);
    }
    async getAvailabilityByPropertyId(propertyId) {
        try {
            return await this.availabilityService.getAvailabilityByPropertyId(propertyId);
        }
        catch (err) {
            throw new common_1.NotFoundException('Error fetching availability data');
        }
    }
    async getAvgPriceByPropertyId(propertyId) {
        try {
            return await this.availabilityService.getAvgPriceByPropertyId(propertyId);
        }
        catch (err) {
            throw new common_1.NotFoundException('Error fetching average price for the property');
        }
    }
    async update(id, updateAvailabilityDto) {
        return this.availabilityService.update(id, updateAvailabilityDto);
    }
    async remove(id) {
        return this.availabilityService.remove(id);
    }
};
exports.AvailabilityController = AvailabilityController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/api'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_availability_dto_1.CreateAvailabilityDto]),
    __metadata("design:returntype", Promise)
], AvailabilityController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/api'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AvailabilityController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/api/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AvailabilityController.prototype, "findOne", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/api/propertyById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AvailabilityController.prototype, "getAvailabilityByPropertyId", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/api/propertyAvgPrice/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AvailabilityController.prototype, "getAvgPriceByPropertyId", null);
__decorate([
    (0, common_1.Put)('/api/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_availability_dto_1.CreateAvailabilityDto]),
    __metadata("design:returntype", Promise)
], AvailabilityController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/api/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AvailabilityController.prototype, "remove", null);
exports.AvailabilityController = AvailabilityController = __decorate([
    (0, common_1.Controller)('availabilities'),
    __metadata("design:paramtypes", [availability_service_1.AvailabilityService])
], AvailabilityController);
//# sourceMappingURL=availability.controller.js.map