import Stripe from 'stripe';

export async function getStripePrices() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const res = stripe.prices.list({
    active: true,
    limit: 10,
    expand: ['data.product'],
  });

  return res;
}
