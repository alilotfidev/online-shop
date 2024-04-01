import { useEffect, useState } from 'react';

import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function Product({ sku }) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(`/api/orders/products?sku=${sku}`);
      if (response.ok) {
        const product = await response.json();
        setProduct(product);
      } else {
        throw new Error('Something went wrong.');
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      {isLoading && (
        <div>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        </div>
      )}
      {product && (
        <div>
          <Link
            className='transition-opacity hover:opacity-80'
            href={`/products/${product?.product?.fields?.sku}`}
          >
            {product?.product?.fields?.name}
          </Link>
        </div>
      )}
    </div>
  );
}
