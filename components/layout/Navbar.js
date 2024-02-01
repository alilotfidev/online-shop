import { auth } from '@/auth';
import { signOut } from '@/auth';

import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default async function Navbar() {
  const session = await auth();
  const isLoggedIn = session?.user.email ? true : false;

  return (
    <nav className='flex justify-between items-center py-8 px-12 relative'>
      <div className='font-bold text-2xl'>Fjallraven</div>
      <div>
        {isLoggedIn ? (
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
        ) : (
          <Link href='/login' className={buttonVariants()}>
            Login
          </Link>
        )}
      </div>
      <div className='devider w-[90%] h-[1px] bg-white opacity-10 absolute bottom-0 left-1/2 -translate-x-1/2'></div>
    </nav>
  );
}
