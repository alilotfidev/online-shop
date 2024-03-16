import { notFound } from 'next/navigation';
import Information from '@/components/order/Information';

export default function Order1({ params }) {
  const step = params?.step || null;
  const isInformation = step === 'information';
  const isConfirmation = step === 'confirmation';
  if (!step || (!isInformation && !isConfirmation)) {
    notFound();
  }

  return <div className='p-12'>{isInformation && <Information />}</div>;
}
