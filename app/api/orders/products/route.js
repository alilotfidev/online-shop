import { getProduct } from '@/lib/contentful';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const url = new URL(req.nextUrl);
  const searchParams = url.searchParams;

  const sku = searchParams.get('sku') || null;

  if (sku) {
    const res = await getProduct(sku);
    if (res.total === 0) {
      return NextResponse.json({ error: 'product not found' }, { status: 404 });
    } else {
      return NextResponse.json({ product: res.items[0] }, { status: 200 });
    }
  } else {
    return NextResponse.json(
      { error: 'the product id is not valid' },
      { status: 422 }
    );
  }
}
