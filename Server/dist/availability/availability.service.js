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
exports.AvailabilityService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const availability_schema_1 = require("./schemas/availability.schema");
let AvailabilityService = class AvailabilityService {
    constructor(availabilityModel) {
        this.availabilityModel = availabilityModel;
    }
    async create(createAvailabilityDto) {
        const createdAvailability = new this.availabilityModel(createAvailabilityDto);
        return createdAvailability.save();
    }
    async findAll() {
        return this.availabilityModel.find().exec();
    }
    async findOne(id) {
        const availability = await this.availabilityModel.findById(id).exec();
        if (!availability) {
            throw new common_1.NotFoundException(`Availability with ID ${id} not found`);
        }
        return availability;
    }
    async update(id, updateAvailabilityDto) {
        const updatedAvailability = await this.availabilityModel.findByIdAndUpdate(id, updateAvailabilityDto, { new: true });
        if (!updatedAvailability) {
            throw new common_1.NotFoundException(`Availability with ID ${id} not found`);
        }
        return updatedAvailability;
    }
    async remove(id) {
        const deletedAvailability = await this.availabilityModel.findByIdAndDelete(id);
        if (!deletedAvailability) {
            throw new common_1.NotFoundException(`Availability with ID ${id} not found`);
        }
        return deletedAvailability;
    }
    async getAvailabilityByPropertyId(propertyId) {
        try {
            const availabilityEntries = await this.availabilityModel.find({ property_id: propertyId }).exec();
            if (availabilityEntries.length === 0) {
                throw new common_1.NotFoundException('Availability entries not found');
            }
            return availabilityEntries;
        }
        catch (err) {
            console.error('Error fetching Availability entries:', err);
            throw new Error('Error fetching Availability entries');
        }
    }
    async getAvgPriceByPropertyId(propertyId) {
        try {
            const availabilityEntries = await this.availabilityModel.find({ property_id: propertyId }).exec();
            if (availabilityEntries.length === 0) {
                throw new common_1.NotFoundException('No availability entries found for the given property ID');
            }
            let totalPrices = 0;
            let totalSlots = 0;
            availabilityEntries.forEach(entry => {
                entry.available_slots.forEach(slot => {
                    const price = parseFloat(slot.price);
                    if (!isNaN(price)) {
                        totalPrices += price;
                        totalSlots++;
                    }
                });
            });
            if (totalSlots === 0) {
                throw new Error('No valid prices found for the given property ID');
            }
            const avgPrice = totalPrices / totalSlots;
            return avgPrice;
        }
        catch (err) {
            console.error('Error calculating average price:', err);
            throw new Error('Error calculating average price');
        }
    }
};
exports.AvailabilityService = AvailabilityService;
exports.AvailabilityService = AvailabilityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(availability_schema_1.Availability.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AvailabilityService);
//# sourceMappingURL=availability.service.js.map