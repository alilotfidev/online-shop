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
import { PiXLight } from 'react-icons/pi';

export default function FailedOrderPage() {
  return (
    <div className='p-24 flex justify-center items-center'>
      <Card className='min-w-96'>
        <CardHeader>
          <CardTitle>There was an error with the purchase</CardTitle>
          <CardDescription className='text-center'>
            the order details will be sent to you by email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex justify-center items-center text-5xl'>
            <PiXLight />
          </div>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Link href='/' className={buttonVariants()}>
            Back Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
