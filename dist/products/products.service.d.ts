import { MedusaService } from '../integrations/medusa/medusa.service';
export declare class ProductsService {
    private readonly medusaService;
    constructor(medusaService: MedusaService);
    listProducts(query: {
        limit?: number;
        offset?: number;
    }): Promise<any>;
    getProductByHandle(handle: string): Promise<{
        success: boolean;
        product: any;
    }>;
}
