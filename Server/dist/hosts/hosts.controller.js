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
exports.HostsController = void 0;
const common_1 = require("@nestjs/common");
const hosts_service_1 = require("./hosts.service");
const create_host_dto_1 = require("./dto/create-host.dto");
const update_host_dto_1 = require("./dto/update-host.dto");
const public_decorator_1 = require("../auth/decorators/public.decorator");
let HostsController = class HostsController {
    constructor(hostsService) {
        this.hostsService = hostsService;
    }
    async create(createHostDto) {
        return await this.hostsService.create(createHostDto);
    }
    async findAll() {
        return await this.hostsService.findAll();
    }
    async findOne(id) {
        return await this.hostsService.findOne(id);
    }
    async findOneByEmail(email) {
        return await this.hostsService.findOneByEmail(email);
    }
    async update(id, updateHostDto) {
        return await this.hostsService.update(id, updateHostDto);
    }
    async remove(id) {
        return await this.hostsService.remove(id);
    }
};
exports.HostsController = HostsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/api'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_host_dto_1.CreateHostDto]),
    __metadata("design:returntype", Promise)
], HostsController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/api'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HostsController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/api/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HostsController.prototype, "findOne", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/api/getByEmail/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HostsController.prototype, "findOneByEmail", null);
__decorate([
    (0, common_1.Put)('/api/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_host_dto_1.UpdateHostDto]),
    __metadata("design:returntype", Promise)
], HostsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/api/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HostsController.prototype, "remove", null);
exports.HostsController = HostsController = __decorate([
    (0, common_1.Controller)('hosts'),
    __metadata("design:paramtypes", [hosts_service_1.HostsService])
], HostsController);
//# sourceMappingURL=hosts.controller.js.map