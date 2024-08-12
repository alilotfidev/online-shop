const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// TODO: check if authenticated
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const body = await req.json();
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: body?.items,
      mode: 'payment',
      success_url: `${baseUrl}/order/successful?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/order/failed?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        order_id: body?.orderId,
      },
    });
    return NextResponse.json({ sessionId: session.id }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: 'Something went wrong while handling the payment.' },
      { status: 500 }
    );
  }
}
