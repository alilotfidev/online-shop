export const dynamic = 'force-dynamic';
// delete the line above after error handling

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { PiCheckLight } from 'react-icons/pi';

export default async function SuccessfulOrderPage({ searchParams }) {
  const sessionId = searchParams?.session_id || null;
  const sessionRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripeSession/${sessionId}`
  );
  const sessionData = await sessionRes.json();
  console.log(sessionData.items);
  // TODO: error handling & add images to stripe
  return (
    <div className='p-24 flex justify-center items-center'>
      <Card className='min-w-96'>
        <CardHeader>
          <CardTitle>Order Completed Successfully</CardTitle>
          <CardDescription className='text-center'>
            Thanks for your order, {sessionData?.customer_name}
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <div className='flex justify-center items-center text-5xl'>
            <PiCheckLight />
          </div>
          <div className='flex justify-between items-center'>
            <h4>Total Amount:</h4>
            <p className='font-bold'>
              {sessionData?.amount_total + ' ' + sessionData?.currency}
            </p>
          </div>
          <div>
            <h4>Items:</h4>
            <div className='items-list mt-2'>
              {sessionData?.items.map((item, index) => (
                <div
                  key={index}
                  className='flex justify-between text-sm border border-white border-opacity-10 rounded-lg p-2'
                >
                  <div className='flex flex-col gap-2'>
                    <span>{item?.description}</span>
                    <span className='opacity-80'>
                      Quantity: {item?.quantity}
                    </span>
                  </div>
                  <div className='price'>
                    Total: {item?.amount_total + ' ' + item?.currency}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex flex-col gap-2'>
          <p className='text-sm text-muted-foreground'>
            The order details will be sent to you by email.
          </p>
          <Link href='/' className={buttonVariants()}>
            Back Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
