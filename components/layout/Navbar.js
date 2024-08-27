import { auth } from '@/auth';
import { signOut } from '@/auth';

import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import NavbarCartButton from '@/components/cart/NavbarCartButton';

export default async function Navbar() {
  const session = await auth();
  const isLoggedIn = session?.user.email ? true : false;

  return (
    <nav className='flex justify-between items-center py-8 px-12 relative flex-col gap-4 sm:gap-0 sm:flex-row'>
      <Link href='/' className='font-bold text-2xl'>
        Fjallraven
      </Link>
      <div className='flex items-center gap-4'>
        {isLoggedIn ? (
          <div className='flex items-center gap-4'>
            <Link href='/dashboard' className={buttonVariants()}>
              Dashboard
            </Link>
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <Button variant='outline' type='submit'>
                Log out
              </Button>
            </form>
            <NavbarCartButton />
          </div>
        ) : (
          <div className='flex items-center gap-4'>
            <Link href='/login' className={buttonVariants()}>
              Login
            </Link>
            <Link href='/register' className={buttonVariants()}>
              Register
            </Link>
          </div>
        )}
      </div>
      <div className='devider w-[90%] h-[1px] bg-white opacity-10 absolute bottom-0 left-1/2 -translate-x-1/2'></div>
    </nav>
  );
}
