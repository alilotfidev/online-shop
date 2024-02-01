'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/actions';

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
import { buttonVariants } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} aria-disabled={pending} type='submit'>
      {pending ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Please wait
        </>
      ) : (
        <span>Login</span>
      )}
    </Button>
  );
}

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const { pending } = useFormStatus();

  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login with your email & password</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={dispatch}>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' name='email' placeholder='hi@something.com' />
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
            <SubmitButton />
            <Link
              href='/register'
              className={buttonVariants({ variant: 'outline' })}
            >
              Register
            </Link>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <p className='text-xs opacity-70'>
          You can create your account by clicking the Register button above.
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
      </CardFooter>
    </Card>
  );
}
