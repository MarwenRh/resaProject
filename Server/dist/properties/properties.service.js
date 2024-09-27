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
exports.PropertiesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const property_schema_1 = require("./schemas/property.schema");
let PropertiesService = class PropertiesService {
    constructor(propertyModel) {
        this.propertyModel = propertyModel;
    }
    async create(createPropertyDto) {
        const createdProperty = new this.propertyModel(createPropertyDto);
        return createdProperty.save();
    }
    async findAll() {
        return this.propertyModel.find().exec();
    }
    async findOne(id) {
        const property = await this.propertyModel.findById(id).exec();
        if (!property) {
            throw new common_1.NotFoundException(`Property with ID ${id} not found`);
        }
        return property;
    }
    async update(id, updatePropertyDto) {
        const updatedProperty = await this.propertyModel.findByIdAndUpdate(id, updatePropertyDto, { new: true });
        if (!updatedProperty) {
            throw new common_1.NotFoundException(`Property with ID ${id} not found`);
        }
        return updatedProperty;
    }
    async remove(id) {
        const deletedProperty = await this.propertyModel.findByIdAndDelete(id);
        if (!deletedProperty) {
            throw new common_1.NotFoundException(`Property with ID ${id} not found`);
        }
        return deletedProperty;
    }
    async getImages(id) {
        const property = await this.propertyModel.findById(id).exec();
        if (!property) {
            throw new common_1.NotFoundException(`Property with ID ${id} not found`);
        }
        const allPhotos = property.apartment_spaces.reduce((acc, space) => {
            return acc.concat(space.photos);
        }, []);
        return allPhotos;
    }
    async findByDest(dest) {
        const regex = new RegExp(`^${dest}$`, 'i');
        return this.propertyModel.find({ 'location.city': { $regex: regex } }).exec();
    }
    async findByHostsID(host_id) {
        return this.propertyModel.findOne({ host_id }).exec();
    }
    async findByType(type) {
        return this.propertyModel.find({ type }).exec();
    }
};
exports.PropertiesService = PropertiesService;
exports.PropertiesService = PropertiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(property_schema_1.Property.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PropertiesService);
//# sourceMappingURL=properties.service.js.map