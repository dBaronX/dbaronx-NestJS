import { CheckoutItemDto } from './checkout-item.dto';
export declare class CreateCheckoutDto {
    customer_name: string;
    customer_email?: string;
    customer_phone?: string;
    country: string;
    address_line_1: string;
    address_line_2?: string;
    city?: string;
    postal_code?: string;
    currency?: string;
    items: CheckoutItemDto[];
    total_amount: number;
    source?: string;
}
