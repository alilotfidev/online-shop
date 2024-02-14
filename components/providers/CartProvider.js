'use client';

import { CartProvider as USCProvider } from 'use-shopping-cart';

export default function CartProvider({ children }) {
  return (
    <USCProvider
      mode='payment'
      cartMode='client-only'
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      successUrl='http://localhost:3000'
      cancelUrl='http://localhost:3000/nowosci'
      currency='EUR'
      billingAddressCollection={true}
      shouldPersist={true}
    >
      {children}
    </USCProvider>
  );
}
