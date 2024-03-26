import { auth } from '@/auth';
import { getUser } from '@/lib/contentful';

import InformationForm from '@/components/order/InformationForm';

import { redirect } from 'next/dist/server/api-utils';

export default async function Information() {
  const session = await auth();
  const userEmail = session?.user.email || null;
  if (!userEmail) {
    redirect('/login');
  }
  // getting user data from contentful
  const user = await getUser(userEmail);
  const userId = user?.items[0]?.sys?.id || null;
  const userData = user?.items[0]?.fields;
  // handling if the data didn't received

  return (
    <div className='flex justify-center items-center'>
      <InformationForm user={userData} userId={userId} />
    </div>
  );
}
