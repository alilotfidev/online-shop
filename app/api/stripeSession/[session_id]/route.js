const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

import { NextResponse } from 'next/server';

export async function GET(request, params) {
  const sessionId = params?.params?.session_id || null;
  if (!sessionId) {
    return NextResponse.json(
      { error: 'Cannot get the sessionId' },
      { status: 422 }
    );
  } else {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items.data.price.product'],
      });
      return NextResponse.json({
        items: session?.line_items?.data,
        amount_total: session?.amount_total,
        currency: session?.currency,
        customer_name: session?.customer_details?.name,
      });
    } catch (error) {
      return NextResponse.json(
        { error: 'Getting session data from stripe failed' },
        { status: 500 }
      );
    }
  }
}
