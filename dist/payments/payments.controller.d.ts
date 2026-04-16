import { PaymentsService } from './payments.service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { SubmitPaymentProofDto } from './dto/submit-payment-proof.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createIntent(dto: CreatePaymentIntentDto): Promise<{
        success: boolean;
        payment: any;
    }>;
    submitProof(dto: SubmitPaymentProofDto): Promise<{
        success: boolean;
        payment: any;
    }>;
    confirmPayment(id: string, dto: ConfirmPaymentDto): Promise<{
        success: boolean;
        payment: any;
    }>;
}
