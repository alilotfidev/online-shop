import { notFound } from 'next/navigation';
import { getSingleEntry, getSingleAsset } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// ui
import Image from 'next/image';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default async function ProductPage({ params }) {
  const productId = params.product || null;
  if (!productId) {
    notFound();
  }

  const product = await getSingleEntry(productId);
  console.log(product.fields);
  const firstImage = await getSingleAsset(product?.fields?.images[0].sys.id);
  const secondImage = await getSingleAsset(product?.fields?.images[1].sys.id);

  return (
    <div className='productPage p-12 flex flex-col sm:flex-row gap-6'>
      <div className='images flex flex-wrap justify-center sm:justify-normal flex-row sm:flex-col gap-4'>
        <Image
          src={`https:${firstImage?.fields.file.url}`}
          alt={firstImage?.fields.title}
          width={200}
          height={200}
        />
        <Image
          src={`https:${secondImage?.fields.file.url}`}
          alt={secondImage?.fields.title}
          width={200}
          height={200}
        />
      </div>

      <Card className='max-w-md h-fit'>
        <CardHeader>
          <CardTitle>{product.fields.name}</CardTitle>
          <CardDescription>{product.fields.category}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='description prose dark:prose-invert'>
            {documentToReactComponents(product.fields.description)}
          </div>
        </CardContent>
        <CardFooter>
          <div className='flex justify-between items-center w-full flex-wrap gap-2'>
            <p className='price text-lg font-semibold'>
              {product.fields.price} €
            </p>
            <Button>
              <MdOutlineAddShoppingCart className='mr-2 h-4 w-4' /> Add to cart
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
