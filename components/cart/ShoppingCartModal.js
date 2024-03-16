'use client';

import { Button } from '@/components/ui/button';

import Image from 'next/image';
import Link from 'next/link';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart';
import { buttonVariants } from '@/components/ui/button';

export default function ShoppingCartModal() {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
  } = useShoppingCart();

  const items = Object.values(cartDetails ?? {}).map((entry) => entry.price_id);

  return (
    <div>
      <Sheet
        defaultOpen
        open={shouldDisplayCart}
        onOpenChange={() => handleCartClick()}
      >
        <SheetContent className='sm:max-w-lg w-[90vw]'>
          <SheetHeader>
            <SheetTitle>Cart</SheetTitle>
          </SheetHeader>

          <div className='h-full flex flex-col justify-between'>
            <div className='mt-8 flex-1 overflow-y-auto'>
              <ul className='-my-6 divide-y divide-gray-200'>
                {cartCount === 0 ? (
                  <h4 className='py-6'>You do not have any items</h4>
                ) : (
                  <div>
                    {Object.values(cartDetails ?? {}).map((entry) => (
                      <li key={entry.id} className='flex py-6 '>
                        <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                          <Image
                            src={entry.image}
                            alt='Product Image'
                            width={100}
                            height={100}
                          />
                        </div>

                        <div className='ml-4 flex flex-1 flex-col'>
                          <div>
                            <div className='flex justify-between text-base font-medium'>
                              <h3>{entry.name}</h3>
                              <p className='ml-4'>{entry.price} EUR</p>
                              <p className='mt-1 text-sm text-gray-500 line-clamp-2'>
                                {entry.description}
                              </p>
                            </div>

                            <div className='flex items-end text-sm gap-6'>
                              <p className='opacity-60'>
                                QTY: {entry.quantity}
                              </p>
                              <button
                                onClick={() => removeItem(entry.id)}
                                type='button'
                                className='font-medium text-primary hover:text-primary/80'
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </div>
                )}
              </ul>
            </div>
            <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
              <div className='flex justify-between text-base font-medium'>
                <p>Subtotal</p>
                <p>{totalPrice} EUR</p>
              </div>
              <p className='mt-0.5 text-sm opacity-60'>
                Shipping and taxes are calculated at checkout
              </p>

              <div className='mt-6'>
                <Link
                  href='/order'
                  onClick={() => handleCartClick()}
                  className={buttonVariants({
                    className: 'w-full',
                  })}
                >
                  Checkout
                </Link>
              </div>

              <div className='mt-6 flex justify-center text-center text-sm'>
                <Button
                  className='w-full mt-4 bg-black text-white'
                  onClick={() => handleCartClick()}
                >
                  Continue shopping
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
