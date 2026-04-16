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
exports.CheckoutService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../integrations/supabase/supabase.service");
const telegram_service_1 = require("../integrations/telegram/telegram.service");
const generate_public_reference_1 = require("../common/utils/generate-public-reference");
let CheckoutService = class CheckoutService {
    supabaseService;
    telegramService;
    constructor(supabaseService, telegramService) {
        this.supabaseService = supabaseService;
        this.telegramService = telegramService;
    }
    async createManualOrder(dto) {
        const client = this.supabaseService.getClient();
        const publicReference = (0, generate_public_reference_1.generatePublicReference)('MO');
        const payload = {
            public_reference: publicReference,
            medusa_order_id: null,
            customer_name: dto.customer_name,
            customer_email: dto.customer_email ?? null,
            customer_phone: dto.customer_phone ?? null,
            country: dto.country,
            address_line_1: dto.address_line_1,
            address_line_2: dto.address_line_2 ?? null,
            city: dto.city ?? null,
            postal_code: dto.postal_code ?? null,
            items: dto.items ?? [],
            product_snapshot: dto.items ?? [],
            subtotal: dto.total_amount,
            shipping_amount: 0,
            total_amount: dto.total_amount,
            currency: (dto.currency || 'USD').toUpperCase(),
            payment_status: 'pending',
            fulfillment_status: 'pending',
            supplier_status: 'pending',
            operational_status: 'new',
            payment_method: 'manual',
            notes: null,
            source: dto.source || 'website',
            status: 'pending',
            updated_at: new Date().toISOString(),
        };
        const { data, error } = await client
            .from('manual_orders')
            .insert(payload)
            .select()
            .single();
        if (error || !data) {
            throw new common_1.InternalServerErrorException(`Failed to create manual order: ${error?.message || 'unknown error'}`);
        }
        await this.telegramService.sendAdminAlert([
            '🛒 <b>New Manual Order</b>',
            `Ref: <code>${publicReference}</code>`,
            `Customer: ${dto.customer_name}`,
            `Email: ${dto.customer_email || '-'}`,
            `Phone: ${dto.customer_phone || '-'}`,
            `Country: ${dto.country}`,
            `Total: ${dto.total_amount} ${(dto.currency || 'USD').toUpperCase()}`,
            `Items: ${dto.items.length}`,
        ].join('\n'));
        return {
            success: true,
            order: data,
        };
    }
};
exports.CheckoutService = CheckoutService;
exports.CheckoutService = CheckoutService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService,
        telegram_service_1.TelegramService])
], CheckoutService);
//# sourceMappingURL=checkout.service.js.map