import { Controller, Post, Body } from '@nestjs/common';
import Stripe from 'stripe';

const isProd = process.env.NODE_ENV === 'production';

// 🔥 Ensure key exists BEFORE Stripe initializes
const stripeKey = isProd
  ? process.env.STRIPE_SECRET_KEY_LIVE
  : process.env.STRIPE_SECRET_KEY_TEST;

if (!stripeKey) {
  throw new Error('❌ STRIPE KEY NOT FOUND IN ENV');
}

console.log('✅ Using Stripe Key:', stripeKey.substring(0, 10));

const stripe = new Stripe(stripeKey, {
  apiVersion: '2026-03-25.dahlia',
});

@Controller('checkout')
export class CheckoutController {

  @Post()
  async createCheckout(@Body() body: { amount: number }) {

    // ✅ FIXED CONDITION
    if (!body.amount || body.amount <= 0) {
      throw new Error('Invalid amount');
    }

    const siteUrl = isProd
      ? process.env.SITE_URL_PROD
      : process.env.SITE_URL_LOCAL;

    if (!siteUrl) {
      throw new Error('❌ SITE URL NOT SET');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',

      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'dBaronX Product' },
            unit_amount: body.amount * 100,
          },
          quantity: 1,
        },
      ],

      // ✅ FIXED TEMPLATE STRINGS
      success_url: `${siteUrl}/success`,
      cancel_url: `${siteUrl}/cancel`,
    });

    return { url: session.url };
  }
}