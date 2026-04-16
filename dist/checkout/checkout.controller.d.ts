import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
export declare class CheckoutController {
    private readonly checkoutService;
    constructor(checkoutService: CheckoutService);
    createManual(dto: CreateCheckoutDto): Promise<{
        success: boolean;
        order: any;
    }>;
}
