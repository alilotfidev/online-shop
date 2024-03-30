'use client';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

import { useShoppingCart } from 'use-shopping-cart';

// ui
import Image from 'next/image';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Confirmation({ orderId }) {
  // error handling for when the order doesn't exsists
  const { cartCount, cartDetails, totalPrice } = useShoppingCart();

  const updateOrder = async () => {
    //  adding products to the order
    const items = Object.values(cartDetails ?? {});
    const formattedItems = items.map((item) => {
      return { sku: item.SKU, quantity: item.quantity };
    });
    const orderData = { items: formattedItems, orderId, totalPrice };
    // make a request to api
    try {
      const response = await fetch('/api/orders/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      if (response.ok) {
        await handlePayment(orderId);
      } else {
        throw new Error('Something went wrong.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async (orderId) => {
    const items = Object.values(cartDetails ?? {});
    const formattedItems = items.map((item) => {
      return { price: item.price_id, quantity: item.quantity };
    });
    const sessionPayload = { items: formattedItems, orderId };
    const session = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripeSession/create`,
      {
        method: 'POST',
        body: JSON.stringify(sessionPayload),
        headers: {
          'content-type': 'application/json',
        },
      }
    );
    const sessionJson = await session.json();
    if (sessionJson.error) {
      throw new Error(sessionJson.error);
    } else {
      console.log({ result: sessionJson });
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionJson.sessionId,
      });
      if (error) {
        if (error instanceof Error) throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <Card className='order-overview'>
        <CardHeader>
          <CardTitle>Order Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='-my-6 divide-y divide-gray-200'>
            {cartCount === 0 ? (
              <h4 className='py-6'>You do not have any items</h4>
            ) : (
              <div>
                {Object.values(cartDetails ?? {}).map((entry) => (
                  <li key={entry.id} className='flex py-6 '>
                    <div className='h-24 w-24 overflow-hidden rounded-md border border-gray-200'>
                      <Image
                        src={entry.image}
                        alt='Product Image'
                        width={100}
                        height={100}
                      />
                    </div>

                    <div className='ml-4 flex flex-col'>
                      <div>
                        <div className='text-base font-medium'>
                          <h3>{entry.name}</h3>
                          <p>{entry.price} EUR</p>
                        </div>

                        <div className='flex items-end text-sm gap-6'>
                          <p className='opacity-60'>QTY: {entry.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </div>
            )}
          </ul>
        </CardContent>
        <CardFooter className='flex flex-col'>
          <div className='w-full flex justify-between text-base font-medium'>
            <p>Total Price:</p>
            <p>{totalPrice} EUR</p>
          </div>
          <Button className='w-full mt-4 font-bold' onClick={updateOrder}>
            Pay
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
