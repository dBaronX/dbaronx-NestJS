import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    listOrders(limit?: string): Promise<{
        success: boolean;
        count: number;
        orders: any[];
    }>;
    getOrderByReference(publicReference: string): Promise<{
        success: boolean;
        order: any;
    }>;
    getOrderById(id: string): Promise<{
        success: boolean;
        order: any;
    }>;
}
