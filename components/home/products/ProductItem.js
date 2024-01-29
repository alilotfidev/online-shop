import Image from 'next/image';

export default function ProductItem({ product, assetFinder }) {
  const images = assetFinder(product.images);
  const mainImage = images[0].fields.file;
  const secondaryImage = images[1].fields.file;
  console.log(product);
  return (
    <div className='flex flex-col gap-3'>
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
      <div className='information'>
        <h4>{product.name}</h4>
        <p className='text-sm opacity-70'>{product.category}</p>
        <p className='price font-bold'>{product.price} €</p>
      </div>
    </div>
  );
}
