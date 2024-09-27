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
exports.HostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const host_schema_1 = require("./schemas/host.schema");
let HostsService = class HostsService {
    constructor(hostModel) {
        this.hostModel = hostModel;
    }
    async create(createHostDto) {
        const newHost = new this.hostModel(createHostDto);
        return newHost.save();
    }
    async findAll() {
        return this.hostModel.find().exec();
    }
    async findOne(id) {
        const host = await this.hostModel.findById(id).exec();
        if (!host) {
            throw new common_1.NotFoundException(`Host with ID ${id} not found`);
        }
        return host;
    }
    async findOneByEmail(email) {
        const host = await this.hostModel.findOne({ email }).exec();
        if (!host) {
            throw new common_1.NotFoundException(`Host with email ${email} not found`);
        }
        return host;
    }
    async update(id, updateHostDto) {
        const existingHost = await this.hostModel.findByIdAndUpdate(id, updateHostDto, { new: true }).exec();
        if (!existingHost) {
            throw new common_1.NotFoundException(`Host with ID ${id} not found`);
        }
        return existingHost;
    }
    async remove(id) {
        const result = await this.hostModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Host with ID ${id} not found`);
        }
    }
};
exports.HostsService = HostsService;
exports.HostsService = HostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(host_schema_1.Host.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], HostsService);
//# sourceMappingURL=hosts.service.js.map