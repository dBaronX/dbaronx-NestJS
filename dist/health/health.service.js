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
exports.HealthService = void 0;
const common_1 = require("@nestjs/common");
const medusa_service_1 = require("../integrations/medusa/medusa.service");
const supabase_service_1 = require("../integrations/supabase/supabase.service");
let HealthService = class HealthService {
    supabaseService;
    medusaService;
    constructor(supabaseService, medusaService) {
        this.supabaseService = supabaseService;
        this.medusaService = medusaService;
    }
    getHealth() {
        return {
            success: true,
            service: 'dbx-api',
            status: 'ok',
            timestamp: new Date().toISOString(),
        };
    }
    async getDeepHealth() {
        let supabase = false;
        let medusa = false;
        try {
            const client = this.supabaseService.getClient();
            const { error } = await client.from('system_logs').select('id').limit(1);
            supabase = !error;
        }
        catch {
            supabase = false;
        }
        try {
            await this.medusaService.listProducts({ limit: 1 });
            medusa = true;
        }
        catch {
            medusa = false;
        }
        return {
            success: supabase && medusa,
            service: 'dbx-api',
            status: supabase && medusa ? 'ok' : 'degraded',
            dependencies: {
                supabase,
                medusa,
            },
            timestamp: new Date().toISOString(),
        };
    }
};
exports.HealthService = HealthService;
exports.HealthService = HealthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService,
        medusa_service_1.MedusaService])
], HealthService);
//# sourceMappingURL=health.service.js.map