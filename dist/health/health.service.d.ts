import { MedusaService } from '../integrations/medusa/medusa.service';
import { SupabaseService } from '../integrations/supabase/supabase.service';
export declare class HealthService {
    private readonly supabaseService;
    private readonly medusaService;
    constructor(supabaseService: SupabaseService, medusaService: MedusaService);
    getHealth(): {
        success: boolean;
        service: string;
        status: string;
        timestamp: string;
    };
    getDeepHealth(): Promise<{
        success: boolean;
        service: string;
        status: string;
        dependencies: {
            supabase: boolean;
            medusa: boolean;
        };
        timestamp: string;
    }>;
}
