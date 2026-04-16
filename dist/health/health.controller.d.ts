import { HealthService } from './health.service';
export declare class HealthController {
    private readonly healthService;
    constructor(healthService: HealthService);
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
