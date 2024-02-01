import SignUpForm from '@/components/auth/SignUpForm';
export default async function RegisterPage() {
  return (
    <div className='flex justify-center items-center p-12'>
      <SignUpForm />
    </div>
  );
}
