'use client';

import { useShoppingCart } from 'use-shopping-cart';

import Image from 'next/image';

// ui
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function Order() {
  const { cartCount, cartDetails } = useShoppingCart();

  return (
    <div className='SubmitOrder p-12 flex justify-center gap-6'>
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
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid grid-cols-2 w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='firstName'>First Name</Label>
                <Input
                  id='firstName'
                  name='firstName'
                  placeholder='John'
                  type='text'
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='lastName'>Last Name</Label>
                <Input
                  id='lastName'
                  name='lastName'
                  placeholder='Wick'
                  type='text'
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  placeholder='hi@something.com'
                  type='email'
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='country'>Country</Label>

                <Select name='country' id='country'>
                  <SelectTrigger>
                    <SelectValue placeholder='Select your country' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='canada'>Canada</SelectItem>
                      <SelectItem value='netherlands'>Netherlands</SelectItem>
                      <SelectItem value='uk'>United Kingdom</SelectItem>
                      <SelectItem value='us'>United States</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='city'>City</Label>
                <Input
                  id='city'
                  name='city'
                  placeholder='Eindhoven'
                  type='text'
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='zip'>ZIP Code</Label>
                <Input id='zip' name='zip' placeholder='ZIP Code' type='text' />
              </div>
              <div className='col-span-2 flex flex-col space-y-1.5'>
                <Label htmlFor='address'>Address</Label>
                <Textarea
                  placeholder='Type your address here.'
                  id='address'
                  name='address'
                />
                <p className='text-sm text-muted-foreground'>
                  Please type your address with details here.
                </p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
