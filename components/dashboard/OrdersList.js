'use client';

import { renderDate } from '@/lib/helpers';

// ui
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Product from '@/components/dashboard/Product';

export default function OrdersList({ orders }) {
  console.log(orders[1]?.fields?.products?.items);
  return (
    <div className='OrdersList flex flex-col gap-4'>
      {orders.map((order) => (
        <Card>
          <CardHeader>
            <CardTitle>{order?.fields?.orderId}</CardTitle>
            <CardDescription className='flex justify-between'>
              <span>{renderDate(order?.fields?.orderDate) || ''}</span>
              <span className='border rounded-lg p-2'>
                {order?.fields?.status || ''}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {order?.fields?.products?.items.map((product) => (
              <Product sku={product.sku} />
            ))}
          </CardContent>
          <CardFooter>
            <p>{order?.fields?.address || ''}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
