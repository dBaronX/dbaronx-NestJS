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
exports.MedusaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let MedusaService = class MedusaService {
    configService;
    baseUrl;
    apiKey;
    constructor(configService) {
        this.configService = configService;
        this.baseUrl = this.configService.get('medusa.baseUrl') || '';
        this.apiKey = this.configService.get('medusa.apiKey') || '';
    }
    buildHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.apiKey) {
            headers['x-publishable-api-key'] = this.apiKey;
        }
        return headers;
    }
    async listProducts(query) {
        if (!this.baseUrl) {
            throw new common_1.InternalServerErrorException('Medusa base URL not configured');
        }
        const searchParams = new URLSearchParams();
        if (query) {
            Object.entries(query).forEach(([key, value]) => {
                searchParams.append(key, String(value));
            });
        }
        const url = `${this.baseUrl}/store/products${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: this.buildHeaders(),
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new common_1.InternalServerErrorException(`Failed to fetch products from Medusa: ${errorText}`);
        }
        return response.json();
    }
    async getProductByHandle(handle) {
        if (!this.baseUrl) {
            throw new common_1.InternalServerErrorException('Medusa base URL not configured');
        }
        const url = `${this.baseUrl}/store/products?handle=${encodeURIComponent(handle)}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: this.buildHeaders(),
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new common_1.InternalServerErrorException(`Failed to fetch product from Medusa: ${errorText}`);
        }
        return response.json();
    }
};
exports.MedusaService = MedusaService;
exports.MedusaService = MedusaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MedusaService);
//# sourceMappingURL=medusa.service.js.map