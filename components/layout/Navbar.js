// import { signOut } from '@/auth';

// ui
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <nav className='flex justify-between items-center py-8 px-12 relative'>
      <div className='font-bold text-2xl'>Wallaxy</div>
      <div>
        <form
        // action={async () => {
        //   'use server';
        //   await signOut();
        // }}
        >
          <Button variant='outline' type='submit'>
            Log out
          </Button>
        </form>
      </div>
      <div className='devider w-[90%] h-[1px] bg-white opacity-10 absolute bottom-0 left-1/2 -translate-x-1/2'></div>
    </nav>
  );
}
