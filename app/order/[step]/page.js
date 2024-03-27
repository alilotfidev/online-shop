import { notFound } from 'next/navigation';
import Information from '@/components/order/Information';
import Confirmation from '@/components/order/Confirmation';

import { getOrder } from '@/lib/contentful';

export default async function Order1({ params, searchParams }) {
  const step = params?.step || null;
  const isInformation = step === 'information';
  const isConfirmation = step === 'confirmation';
  if (!step || (!isInformation && !isConfirmation)) {
    notFound();
  }

  const orderId = searchParams?.order_id || null;
  let contentfulId = null;
  if (orderId) {
    const order = await getOrder(orderId);
    contentfulId = order?.items[0]?.sys.id || null;
  }

  return (
    <div className='p-12'>
      {isInformation && <Information />}
      {isConfirmation && <Confirmation orderId={contentfulId} />}
    </div>
  );
}
