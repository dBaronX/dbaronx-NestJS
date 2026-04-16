import { ConfigService } from '@nestjs/config';
export declare class MedusaService {
    private readonly configService;
    private readonly baseUrl;
    private readonly apiKey;
    constructor(configService: ConfigService);
    private buildHeaders;
    listProducts(query?: Record<string, string | number>): Promise<any>;
    getProductByHandle(handle: string): Promise<any>;
}
