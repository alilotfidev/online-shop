'use client';
import { PiShoppingCartLight } from 'react-icons/pi';
import { useShoppingCart } from 'use-shopping-cart';
import { Button } from '@/components/ui/button';

export default function NavbarCartButton() {
  const { handleCartClick, cartCount } = useShoppingCart();

  return (
    <Button variant='outline' size='icon' onClick={() => handleCartClick()}>
      <PiShoppingCartLight className='h-4 w-4 mr-1' />
      <span>{cartCount}</span>
    </Button>
  );
}
