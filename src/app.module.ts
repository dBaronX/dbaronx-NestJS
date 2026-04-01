console.log('STRIPE_SECRET_KEY loaded?', !!process.env.STRIPE_SECRET_KEY);
console.log('Value starts with:', process.env.STRIPE_SECRET_KEY?.slice(0, 8) + '...');
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckoutController } from './payments/checkout.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, CheckoutController],
  providers: [AppService],
})
export class AppModule {}