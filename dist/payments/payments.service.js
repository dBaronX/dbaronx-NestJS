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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../integrations/supabase/supabase.service");
const telegram_service_1 = require("../integrations/telegram/telegram.service");
let PaymentsService = class PaymentsService {
    supabaseService;
    telegramService;
    constructor(supabaseService, telegramService) {
        this.supabaseService = supabaseService;
        this.telegramService = telegramService;
    }
    async createPaymentIntent(dto) {
        const client = this.supabaseService.getClient();
        const order = await this.resolveOrder(dto.manual_order_id, dto.public_reference);
        const { data, error } = await client
            .from('payment_records')
            .insert({
            manual_order_id: order.id,
            provider: dto.provider,
            provider_reference: dto.provider_reference ?? null,
            amount: dto.amount,
            currency: (dto.currency || order.currency || 'USD').toUpperCase(),
            payment_status: 'pending',
            updated_at: new Date().toISOString(),
        })
            .select()
            .single();
        if (error || !data) {
            throw new common_1.InternalServerErrorException(`Failed to create payment record: ${error?.message || 'unknown error'}`);
        }
        return {
            success: true,
            payment: data,
        };
    }
    async submitPaymentProof(dto) {
        const client = this.supabaseService.getClient();
        const order = await this.resolveOrder(dto.manual_order_id, dto.public_reference);
        const { data, error } = await client
            .from('payment_records')
            .insert({
            manual_order_id: order.id,
            provider: dto.provider,
            provider_reference: dto.provider_reference ?? null,
            amount: order.total_amount,
            currency: order.currency || 'USD',
            payment_status: 'proof_submitted',
            proof_url: dto.proof_url ?? null,
            payer_name: dto.payer_name ?? null,
            payer_email: dto.payer_email ?? null,
            metadata: {},
            updated_at: new Date().toISOString(),
        })
            .select()
            .single();
        if (error || !data) {
            throw new common_1.InternalServerErrorException(`Failed to submit payment proof: ${error?.message || 'unknown error'}`);
        }
        await client
            .from('manual_orders')
            .update({
            payment_status: 'proof_submitted',
            updated_at: new Date().toISOString(),
        })
            .eq('id', order.id);
        await this.telegramService.sendAdminAlert([
            '💳 <b>Payment Proof Submitted</b>',
            `Ref: <code>${order.public_reference}</code>`,
            `Provider: ${dto.provider}`,
            `Amount: ${order.total_amount} ${order.currency}`,
            `Proof: ${dto.proof_url || '-'}`,
        ].join('\n'));
        return {
            success: true,
            payment: data,
        };
    }
    async confirmPayment(id, dto) {
        const client = this.supabaseService.getClient();
        const { data: payment, error: paymentError } = await client
            .from('payment_records')
            .select('*')
            .eq('id', id)
            .single();
        if (paymentError || !payment) {
            throw new common_1.NotFoundException('Payment record not found');
        }
        const { data: updatedPayment, error: updatePaymentError } = await client
            .from('payment_records')
            .update({
            payment_status: 'confirmed',
            metadata: {
                ...(payment.metadata || {}),
                confirmed_by: dto.confirmed_by || 'admin',
                note: dto.note || null,
            },
            updated_at: new Date().toISOString(),
        })
            .eq('id', id)
            .select()
            .single();
        if (updatePaymentError || !updatedPayment) {
            throw new common_1.InternalServerErrorException(`Failed to confirm payment: ${updatePaymentError?.message || 'unknown error'}`);
        }
        if (!payment.manual_order_id) {
            throw new common_1.BadRequestException('Payment record is not linked to an order');
        }
        await client
            .from('manual_orders')
            .update({
            payment_status: 'confirmed',
            operational_status: 'paid',
            updated_at: new Date().toISOString(),
        })
            .eq('id', payment.manual_order_id);
        return {
            success: true,
            payment: updatedPayment,
        };
    }
    async resolveOrder(manualOrderId, publicReference) {
        const client = this.supabaseService.getClient();
        if (!manualOrderId && !publicReference) {
            throw new common_1.BadRequestException('manual_order_id or public_reference is required');
        }
        let query = client.from('manual_orders').select('*');
        if (manualOrderId) {
            query = query.eq('id', manualOrderId);
        }
        else {
            query = query.eq('public_reference', publicReference);
        }
        const { data, error } = await query.single();
        if (error || !data) {
            throw new common_1.NotFoundException('Order not found');
        }
        return data;
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService,
        telegram_service_1.TelegramService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map