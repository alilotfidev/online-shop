import Link from 'next/link';
import Image from 'next/image';
import { PiShoppingCartLight } from 'react-icons/pi';
import AddToCartButton from '@/components/cart/AddToCartButton';

export default function ProductItem({
  product,
  assetFinder,
  productId,
  getPriceId,
}) {
  const images = assetFinder(product.images);
  const mainImage = images[0].fields.file;
  const secondaryImage = images[1].fields.file;

  const stripeProductId = getPriceId(product.name, product.price);
  return (
    <div className='flex flex-col gap-3'>
      <Link href={`/products/${productId}`}>
        <div className='images group relative'>
          <Image
            className='transition-opacity duration-300 ease-in-out group-hover:opacity-0'
            src={`https:${mainImage?.url}`}
            width={300}
            height={300}
            alt={product?.name}
          />
          <div className='image absolute top-0 left-0'>
            <Image
              className='opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'
              src={`https:${secondaryImage?.url}`}
              width={300}
              height={300}
              alt={product?.name}
            />
          </div>
        </div>
      </Link>
      <div className='information relative'>
        <Link href={`/products/${productId}`}>
          <h4>{product.name}</h4>
        </Link>
        <p className='text-sm opacity-70'>{product.category}</p>
        <p className='price font-bold'>{product.price} €</p>
        <div className='add-icon text-2xl absolute bottom-0 right-5 cursor-pointer'>
          <AddToCartButton
            name={product.name}
            description=''
            currency={'EUR'}
            image={`https:${mainImage?.url}`}
            price={product.price}
            price_id={stripeProductId}
          >
            <PiShoppingCartLight />
          </AddToCartButton>
        </div>
      </div>
    </div>
  );
}

//             price_id={stripeProductId}
