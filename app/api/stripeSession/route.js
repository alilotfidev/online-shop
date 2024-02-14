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
      success_url: `${req.nextUrl.origin}/?success=true`,
      cancel_url: `${req.nextUrl.origin}/?canceled=true`,
    });

    return NextResponse.json({ sessionId: session.id }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: 'Something went wrong while handling the payment.' },
      { status: 500 }
    );
  }
}
