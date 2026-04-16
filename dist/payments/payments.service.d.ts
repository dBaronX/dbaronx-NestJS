import { SupabaseService } from '../integrations/supabase/supabase.service';
import { TelegramService } from '../integrations/telegram/telegram.service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { SubmitPaymentProofDto } from './dto/submit-payment-proof.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
export declare class PaymentsService {
    private readonly supabaseService;
    private readonly telegramService;
    constructor(supabaseService: SupabaseService, telegramService: TelegramService);
    createPaymentIntent(dto: CreatePaymentIntentDto): Promise<{
        success: boolean;
        payment: any;
    }>;
    submitPaymentProof(dto: SubmitPaymentProofDto): Promise<{
        success: boolean;
        payment: any;
    }>;
    confirmPayment(id: string, dto: ConfirmPaymentDto): Promise<{
        success: boolean;
        payment: any;
    }>;
    private resolveOrder;
}
