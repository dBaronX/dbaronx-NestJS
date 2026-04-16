"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TelegramService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let TelegramService = TelegramService_1 = class TelegramService {
    configService;
    logger = new common_1.Logger(TelegramService_1.name);
    botToken;
    adminChatId;
    constructor(configService) {
        this.configService = configService;
        this.botToken = this.configService.get('telegram.botToken') || '';
        this.adminChatId = this.configService.get('telegram.adminChatId') || '';
    }
    async sendAdminAlert(message) {
        if (!this.botToken || !this.adminChatId) {
            const error = 'Telegram config missing, alert skipped';
            this.logger.warn(error);
            return { ok: false, error };
        }
        try {
            const response = await fetch(`https://api.telegram.org/bot${this.botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: this.adminChatId,
                    text: message,
                    parse_mode: 'HTML',
                    disable_web_page_preview: true,
                }),
            });
            if (!response.ok) {
                const errorText = await response.text();
                this.logger.error(`Telegram alert failed: ${errorText}`);
                return { ok: false, error: errorText };
            }
            return { ok: true };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown Telegram send failure';
            this.logger.error(`Telegram alert exception: ${message}`);
            return { ok: false, error: message };
        }
    }
};
exports.TelegramService = TelegramService;
exports.TelegramService = TelegramService = TelegramService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TelegramService);
//# sourceMappingURL=telegram.service.js.map