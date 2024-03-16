'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createOrder } from '@/app/actions';

// ui
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Loader2 } from 'lucide-react';

export default function InformationForm({ user }) {
  const [errorMessage, dispatch] = useFormState(createOrder, undefined);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={dispatch}>
            <div className='grid grid-cols-2 w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='firstName'>First Name</Label>
                <Input
                  id='firstName'
                  name='firstName'
                  placeholder='John'
                  type='text'
                  value={user?.firstName}
                  readOnly
                  className='opacity-70 cursor-not-allowed'
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='lastName'>Last Name</Label>
                <Input
                  id='lastName'
                  name='lastName'
                  placeholder='Wick'
                  type='text'
                  value={user?.lastName}
                  readOnly
                  className='opacity-70 cursor-not-allowed'
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  placeholder='hi@something.com'
                  type='email'
                  value={user?.email}
                  readOnly
                  className='opacity-70 cursor-not-allowed'
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='country'>Country</Label>

                <Select
                  name='country'
                  id='country'
                  value={user?.country.toLowerCase()}
                  readOnly
                  className='opacity-70 cursor-not-allowed'
                >
                  <SelectTrigger className='opacity-70 cursor-not-allowed'>
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
                  value={user?.city}
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='zip'>ZIP Code</Label>
                <Input
                  id='zip'
                  name='zip'
                  placeholder='ZIP Code'
                  type='text'
                  value={user?.zipCode}
                />
              </div>
              <div className='col-span-2 flex flex-col space-y-1.5'>
                <Label htmlFor='address'>Address</Label>
                <Textarea
                  placeholder='Type your address here.'
                  id='address'
                  name='address'
                  value={user?.address}
                />
                <p className='text-sm text-muted-foreground'>
                  Please type your address with details here.
                </p>
              </div>
              <SubmitButton />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div
            className='flex items-end space-x-1'
            aria-live='polite'
            aria-atomic='true'
          >
            {errorMessage && (
              <>
                <p className='text-sm text-red-500'>{errorMessage}</p>
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      aria-disabled={pending}
      type='submit'
      className='col-span-2'
    >
      {pending ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Please wait
        </>
      ) : (
        <span>Confirm Information</span>
      )}
    </Button>
  );
}
