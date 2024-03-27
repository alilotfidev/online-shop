// TODO: check if authenticated
import { NextResponse } from 'next/server';

import { addProductsToOrder } from '@/lib/contentful';

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body);
    await addProductsToOrder(body.orderId, { items: body.items });
    return NextResponse.json(
      { message: 'order updated successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Something went wrong while updating the order.' },
      { status: 500 }
    );
  }
}
