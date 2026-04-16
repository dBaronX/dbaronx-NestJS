import { SupabaseService } from '../integrations/supabase/supabase.service';
export declare class OrdersService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    listOrders(limit?: number): Promise<{
        success: boolean;
        count: number;
        orders: any[];
    }>;
    getOrderById(id: string): Promise<{
        success: boolean;
        order: any;
    }>;
    getOrderByReference(publicReference: string): Promise<{
        success: boolean;
        order: any;
    }>;
}
