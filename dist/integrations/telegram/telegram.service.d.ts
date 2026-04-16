import { ConfigService } from '@nestjs/config';
export declare class TelegramService {
    private readonly configService;
    private readonly logger;
    private readonly botToken;
    private readonly adminChatId;
    constructor(configService: ConfigService);
    sendAdminAlert(message: string): Promise<{
        ok: boolean;
        error?: string;
    }>;
}
