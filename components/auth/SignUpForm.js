'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { register } from '@/app/actions';

// ui
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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
        <span>SignUp</span>
      )}
    </Button>
  );
}

export default function SignUpForm() {
  const [errorMessage, dispatch] = useFormState(register, undefined);

  return (
    <Card className='min-w-[40vw]'>
      <CardHeader>
        <CardTitle>SignUp</CardTitle>
        <CardDescription>
          Please enter your information in the form below.
        </CardDescription>
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
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                name='password'
                placeholder='enter your password here'
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='phone'>Phone</Label>
              <Input
                id='phone'
                name='phone'
                placeholder='type your phone number here'
                type='tel'
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
            <SubmitButton />
            <Button className='col-span-2' variant='outline' asChild>
              <Link href='/login'>I already have an account</Link>
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className='flex flex-col'>
          <p className='text-xs opacity-70'>
            By signing up to create an account I accept Company's Terms of Use
            and Privacy Policy.
          </p>
          <div
            className='flex h-8 items-end space-x-1'
            aria-live='polite'
            aria-atomic='true'
          >
            {errorMessage && (
              <>
                <p className='text-sm text-red-500'>{errorMessage}</p>
              </>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
