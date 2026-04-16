"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const crypto_1 = require("crypto");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: false,
    });
    const configService = app.get(config_1.ConfigService);
    const frontendUrl = configService.get('app.frontendUrl');
    const port = configService.get('app.port') ?? 3000;
    app.enableCors({
        origin: [
            frontendUrl,
            'https://dbaronx.com',
            'https://www.dbaronx.com',
            'http://localhost:3000',
            'http://localhost:5173',
        ].filter(Boolean),
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id'],
    });
    app.use((req, res, next) => {
        req.requestId = req.headers['x-request-id'] || (0, crypto_1.randomUUID)();
        res.setHeader('X-Request-Id', req.requestId);
        next();
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor());
    await app.listen(port, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map