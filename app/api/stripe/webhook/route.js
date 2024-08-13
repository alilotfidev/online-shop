// TODO: secure the webhook after live setup with stripe signature
import { NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;
import { setOrderPaymentStatus } from '@/lib/contentful';
import { headers } from 'next/headers';

export async function POST(req) {
  const rawBody = await req.text();
  const signature = headers().get('stripe-signature');
  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
  } catch (err) {
    console.error('Webhook error:', err.message);
    return NextResponse.json({ message: 'signature error' }, { status: 400 });
  }
  switch (event.type) {
    case 'checkout.session.completed':
      const succeededCharge = event.data.object;
      // send email for order completed event (to user and ourselves)
      // updating the database
      const succeededOrderId = succeededCharge?.metadata?.order_id || null;

      if (succeededOrderId) {
        await setOrderPaymentStatus(succeededOrderId, 'paid');
      }

      return NextResponse.json({ message: 'success' }, { status: 200 });
      break;
    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  return new NextResponse('RESPONSE EXECUTE', {
    status: 200,
  });
}
