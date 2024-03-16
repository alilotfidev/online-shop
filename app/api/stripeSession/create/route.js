const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// TODO: check if authenticated
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: body,
      mode: 'payment',
      success_url: `http://localhost:3000/order/successful?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/order/failed?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.json({ sessionId: session.id }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: 'Something went wrong while handling the payment.' },
      { status: 500 }
    );
  }
}
