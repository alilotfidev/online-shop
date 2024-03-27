'use client';
import { useShoppingCart } from 'use-shopping-cart';

export default function AddToCartButton({
  children,
  SKU,
  name,
  currency,
  description,
  price,
  image,
  price_id,
}) {
  const { addItem, handleCartClick } = useShoppingCart();
  const product = {
    SKU: SKU,
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: image,
    price_id: price_id,
  };
  return (
    <div
      onClick={() => {
        addItem(product), handleCartClick();
      }}
    >
      {children}
    </div>
  );
}
