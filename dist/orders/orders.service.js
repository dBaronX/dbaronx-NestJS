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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../integrations/supabase/supabase.service");
let OrdersService = class OrdersService {
    supabaseService;
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async listOrders(limit = 20) {
        const client = this.supabaseService.getClient();
        const { data, error } = await client
            .from('manual_orders')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(limit);
        if (error) {
            throw new common_1.InternalServerErrorException(`Failed to fetch orders: ${error.message}`);
        }
        return {
            success: true,
            count: data?.length ?? 0,
            orders: data ?? [],
        };
    }
    async getOrderById(id) {
        const client = this.supabaseService.getClient();
        const { data, error } = await client
            .from('manual_orders')
            .select('*')
            .eq('id', id)
            .single();
        if (error || !data) {
            throw new common_1.NotFoundException('Order not found');
        }
        return {
            success: true,
            order: data,
        };
    }
    async getOrderByReference(publicReference) {
        const client = this.supabaseService.getClient();
        const { data, error } = await client
            .from('manual_orders')
            .select('*')
            .eq('public_reference', publicReference)
            .single();
        if (error || !data) {
            throw new common_1.NotFoundException('Order not found');
        }
        return {
            success: true,
            order: data,
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map