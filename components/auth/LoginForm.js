'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/actions';

// ui
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
            <Button aria-disabled={pending} type='submit'>
              Login
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className='footer-buttons flex justify-between w-full'>
          <Button variant='outline'>Register</Button>
        </div>
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
