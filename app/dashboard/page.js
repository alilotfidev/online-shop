import { auth } from '@/auth';

import { getUserOrders, getUser } from '@/lib/contentful';

import { redirect } from 'next/navigation';

// ui
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import OrdersList from '@/components/dashboard/OrdersList';

export default async function DashboardPage() {
  // getting user email
  const session = await auth();
  const userEmail = session?.user.email || null;
  if (!userEmail) {
    redirect('/login');
  }
  const user = await getUser(userEmail);
  const userId = user.items[0]?.sys?.id || null;
  let orders = null;
  if (userId) {
    const res = await getUserOrders(userId);
    orders = res?.items;
    console.log(orders);
  }

  return (
    <div className='py-8 px-20'>
      <h1 className='font-bold text-3xl'>Dashboard</h1>
      <Card className='mt-12'>
        <CardHeader>
          <CardTitle className='text-xl'>Orders History</CardTitle>
        </CardHeader>
        <CardContent>
          <OrdersList orders={orders} />
        </CardContent>
      </Card>
    </div>
  );
}
