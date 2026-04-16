export declare class CreatePaymentIntentDto {
    manual_order_id?: string;
    public_reference?: string;
    provider: string;
    provider_reference?: string;
    amount: number;
    currency?: string;
}
