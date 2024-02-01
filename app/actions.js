'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import { createCustomer } from '@/lib/contentful';
import { redirect } from 'next/navigation';
import { RedirectType } from 'next/dist/client/components/redirect';

export async function authenticate(prevState, formData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function register(prevState, formData) {
  const customerFields = {
    firstName: { 'en-US': formData.get('firstName') },
    lastName: { 'en-US': formData.get('lastName') },
    email: { 'en-US': formData.get('email') },
    phone: { 'en-US': formData.get('phone') },
    country: { 'en-US': formData.get('country') },
    city: { 'en-US': formData.get('city') },
    zipCode: { 'en-US': formData.get('zip') },
    address: { 'en-US': formData.get('address') },
  };
  // adding password to the rawFormData object
  const userPassword = formData.get('password');
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(userPassword, salt);
  customerFields['password'] = { 'en-US': hashedPassword };

  try {
    const newCustomer = await createCustomer(customerFields);
    await signIn('credentials', {
      email: newCustomer.email['en-US'],
      password: userPassword,
      redirect: false,
    });
  } catch (error) {
    console.log(error);
    return error.message || 'Something went wrong :(';
  }
  redirect('/', RedirectType.push);
}
