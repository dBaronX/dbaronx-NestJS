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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const medusa_service_1 = require("../integrations/medusa/medusa.service");
let ProductsService = class ProductsService {
    medusaService;
    constructor(medusaService) {
        this.medusaService = medusaService;
    }
    async listProducts(query) {
        const response = await this.medusaService.listProducts({
            limit: query.limit ?? 20,
            offset: query.offset ?? 0,
        });
        return {
            success: true,
            ...response,
        };
    }
    async getProductByHandle(handle) {
        const response = await this.medusaService.getProductByHandle(handle);
        const product = response?.products?.[0];
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return {
            success: true,
            product,
        };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [medusa_service_1.MedusaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map