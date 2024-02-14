import { getEntries } from '@/lib/contentful';
import { getStripePrices } from '@/lib/stripe';
import ProductItem from './ProductItem';

export default async function ProductsList() {
  const data = await getEntries('product');
  const products = data.items;
  const assets = data.includes.Asset;

  // getting stripe prices
  const prices = await getStripePrices();
  const getPriceId = (contentfulName, contentfulPrice) => {
    const stripeProduct = prices?.data.find(
      (price) =>
        price.unit_amount_decimal === `${contentfulPrice}00` &&
        price.product.name === contentfulName
    );
    return stripeProduct.id || null;
  };

  const assetFinder = (images) => {
    const imageFiles = [];

    images.forEach((image) => {
      imageFiles.push(
        assets.find((asset) => asset.sys.id === image.sys.id) || null
      );
    });

    return imageFiles;
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12'>
      {products &&
        products.map((product, index) => (
          <ProductItem
            key={index}
            productId={product.sys.id}
            product={product.fields}
            assetFinder={assetFinder}
            getPriceId={getPriceId}
          />
        ))}
    </div>
  );
}
