import { SupabaseService } from '../integrations/supabase/supabase.service';
import { TelegramService } from '../integrations/telegram/telegram.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
export declare class CheckoutService {
    private readonly supabaseService;
    private readonly telegramService;
    constructor(supabaseService: SupabaseService, telegramService: TelegramService);
    createManualOrder(dto: CreateCheckoutDto): Promise<{
        success: boolean;
        order: any;
    }>;
}
