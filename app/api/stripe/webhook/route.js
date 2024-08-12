// TODO: secure the webhook after live setup with stripe signature
import { NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;
import { getOrder, setOrderPaymentStatus } from '@/lib/contentful';

export async function POST(req) {
  const signature = req.headers['stripe-signature'];

  try {
    const eventJSON = await req.json();
    console.log(eventJSON.data.object.metadata);

    const event = stripe.webhooks.constructEvent(
      eventJSON,
      signature,
      endpointSecret
    );

    // Handle the event based on its type (e.g., charge.succeeded)
    switch (event.type) {
      case 'charge.succeeded':
        const succeededCharge = event.data.object;
        // send email for order completed event (to user and ourselves)
        console.log('Payment successful:', succeededCharge);
        // updating the database
        const succeededOrderId = succeededCharge?.metadata?.order_id || null;
        console.log(event.data.object);

        if (succeededOrderId) {
          const order = await getOrder(succeededOrderId);
          const entryId = order?.items[0]?.sys.id || null;
          if (entryId) {
            setOrderPaymentStatus(entryId, true);
          }
        }

        return NextResponse.json({ message: 'success' }, { status: 200 });
        break;
      case 'charge.failed':
        const failedCharge = event.data.object;
        // send email for order completed event (to user and ourselves)
        console.log('Payment successful:', failedCharge);
        // updating the database
        const failedOrderId = failedCharge?.metadata?.order_id || null;
        if (failedOrderId) {
          const order = await getOrder(failedOrderId);
          const entryId = order?.items[0]?.sys.id || null;
          if (entryId) {
            setOrderPaymentStatus(entryId, false);
          }
        }
        return NextResponse.json({ message: 'success' }, { status: 200 });
        break;
      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    console.error('Webhook error:', err.message);
    return NextResponse.json({ message: 'error' }, { status: 400 });
  }
  return new NextResponse('RESPONSE EXECUTE', {
    status: 200,
  });
}
