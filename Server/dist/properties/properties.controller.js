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
exports.PropertiesController = void 0;
const common_1 = require("@nestjs/common");
const properties_service_1 = require("./properties.service");
const create_property_dto_1 = require("./dto/create-property.dto");
const public_decorator_1 = require("../auth/decorators/public.decorator");
let PropertiesController = class PropertiesController {
    constructor(propertiesService) {
        this.propertiesService = propertiesService;
    }
    handleOptions() {
        return {
            'Access-Control-Allow-Origin': 'http://localhost:3001',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        };
    }
    async create(createPropertyDto) {
        const createdProperty = await this.propertiesService.create(createPropertyDto);
        return { property_id: createdProperty._id };
    }
    async findAll() {
        return this.propertiesService.findAll();
    }
    async findOne(id) {
        const property = await this.propertiesService.findOne(id);
        if (!property) {
            throw new common_1.NotFoundException(`Property with ID ${id} not found`);
        }
        return property;
    }
    async update(id, updatePropertyDto) {
        const updatedProperty = await this.propertiesService.update(id, updatePropertyDto);
        if (!updatedProperty) {
            throw new common_1.NotFoundException(`Property with ID ${id} not found`);
        }
        return updatedProperty;
    }
    async remove(id) {
        const deletedProperty = await this.propertiesService.remove(id);
        if (!deletedProperty) {
            throw new common_1.NotFoundException(`Property with ID ${id} not found`);
        }
        return deletedProperty;
    }
    async getByType(type) {
        console.log(`Received request for type: ${type}`);
        const properties = await this.propertiesService.findByType(type);
        if (!properties.length) {
            throw new common_1.NotFoundException(`No properties found for type ${type}`);
        }
        return properties;
    }
    async getByDest(dest) {
        console.log(`Received request for dest: ${dest}`);
        const properties = await this.propertiesService.findByDest(dest);
        if (!properties.length) {
            throw new common_1.NotFoundException(`No properties found for dest ${dest}`);
        }
        return properties;
    }
    async getByHostsID(HostsID) {
        console.log(`Received request for HostsID: ${HostsID}`);
        const properties = await this.propertiesService.findByHostsID(HostsID);
        return properties;
    }
    async getImages(id) {
        const images = await this.propertiesService.getImages(id);
        if (!images) {
            throw new common_1.NotFoundException(`Property with ID ${id} not found`);
        }
        return images;
    }
};
exports.PropertiesController = PropertiesController;
__decorate([
    (0, common_1.Options)('*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "handleOptions", null);
__decorate([
    (0, common_1.Post)('/api'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_property_dto_1.CreatePropertyDto]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/api'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/api/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('/api/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_property_dto_1.CreatePropertyDto]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/api/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "remove", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/api/getByType/:type'),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "getByType", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/api/getByDest/:dest'),
    __param(0, (0, common_1.Param)('dest')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "getByDest", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/api/getByHostsID/:HostsID'),
    __param(0, (0, common_1.Param)('HostsID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "getByHostsID", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/api/getImages/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "getImages", null);
exports.PropertiesController = PropertiesController = __decorate([
    (0, common_1.Controller)('properties'),
    __metadata("design:paramtypes", [properties_service_1.PropertiesService])
], PropertiesController);
//# sourceMappingURL=properties.controller.js.map