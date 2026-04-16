import { GetProductsQueryDto } from './dto/get-products-query.dto';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    listProducts(query: GetProductsQueryDto): Promise<any>;
    getProduct(handle: string): Promise<{
        success: boolean;
        product: any;
    }>;
}
