'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import { createCustomer, createOrderEntry } from '@/lib/contentful';
import { redirect } from 'next/navigation';
import { RedirectType } from 'next/dist/client/components/redirect';
import {
  generateRandomString,
  getYYYYMMDD,
  getISODateString,
} from '@/lib/helpers';

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

export async function createOrder(prevState, formData) {
  const orderFields = {
    country: { 'en-US': formData.get('country') },
    city: { 'en-US': formData.get('city') },
    zipCode: { 'en-US': formData.get('zip') },
    address: { 'en-US': formData.get('address') },
    status: { 'en-US': 'not-paid' },
    isPaid: { 'en-US': false },
  };
  // // adding the order id
  const randomString = generateRandomString(4);
  const date = getYYYYMMDD();
  const orderId = `ORD-${date}-${randomString}`;
  orderFields['orderId'] = { 'en-US': orderId };

  // adding the order date
  const isoDate = getISODateString();
  orderFields['orderDate'] = { 'en-US': isoDate };

  // linking the customer
  const customerId = formData.get('CustomerId');
  orderFields['customer'] = {
    'en-US': {
      sys: {
        type: 'Link',
        linkType: 'Entry',
        id: customerId,
      },
    },
  };

  try {
    const newOrder = await createOrderEntry(orderFields);
    console.log({ newOrder });
  } catch (error) {
    console.log(error);
    return 'Something went wrong :(';
  }
  redirect(`/order/confirmation?order_id=${orderId}`);
}
