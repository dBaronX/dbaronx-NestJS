import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔥 IMPORTANT: Use Render's PORT or fallback to 3000
  const port = process.env.PORT || 3000;

  app.enableCors({
    origin: ['https://dbaronx.com', 'http://localhost:3000'],
    credentials: true,
  });

  await app.listen(port);

  console.log(✅ NestJS API is running on port ${port});
}
bootstrap();