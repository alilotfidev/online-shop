const contentful = require('contentful-management');
import { notFound } from 'next/navigation';

const cdnBaseUrl = `${process.env.CONTENTFUL_READ_ONLY_BASE_URL}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT_ID}`;
const urlAuthPart = `access_token=${process.env.CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN}`;

const createUrl = (url, queries = []) => {
  //creating queries part
  let queriesUrl = '?';
  queries.forEach((query) => {
    queriesUrl += `${query}&`;
  });
  queriesUrl += urlAuthPart;

  const finalUrl = cdnBaseUrl + url + queriesUrl;
  return finalUrl;
};

// request functions
export async function getSingleEntry(entryID) {
  const res = await fetch(createUrl(`/entries/${entryID}`));
  if (res.status === 404) {
    notFound();
  } else if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getEntries(contentType) {
  const res = await fetch(
    createUrl(`/entries`, [`content_type=${contentType}`])
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getUser(email) {
  const res = await fetch(
    createUrl(`/entries`, [
      'content_type=customer',
      `fields.email[match]=${email}`,
    ])
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
export async function getSingleAsset(assetID) {
  const res = await fetch(createUrl(`/assets/${assetID}`));
  if (res.status === 404) {
    notFound();
  } else if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

// using sdk for create and update

const initializeClient = async () => {
  const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_CONTENT_MANAGEMENT_ACCESS_TOKEN,
  });
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);

  const env = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT_ID);

  return env;
};

export async function createCustomer(entryFields) {
  // first checking if the user already exists
  const data = await getUser(entryFields.email['en-US']);
  const user = data?.items[0];
  if (user) {
    throw new Error(
      'You already have an account with this email. please login with that'
    );
  } else {
    const client = await initializeClient();
    const contentType = 'customer';
    const entry = await client.createEntry(contentType, {
      fields: entryFields,
    });
    // If we get a new entry ID, then success, otherwise default to null
    const newEntryId = entry.sys.id ?? null;
    if (newEntryId) {
      // Publish our entry, if success
      const pub = await entry.publish();
      return pub?.fields;
    } else {
      throw new Error('Something went wrong while Signing Up :(');
    }
  }
}

export async function createOrderEntry(entryFields) {
  const client = await initializeClient();
  const contentType = 'order';
  const entry = await client.createEntry(contentType, {
    fields: entryFields,
  });
  // If we get a new entry ID, then success, otherwise default to null
  const newEntryId = entry.sys.id ?? null;
  if (newEntryId) {
    // Publish our entry, if success
    const pub = await entry.publish();
    return pub?.fields;
  } else {
    throw new Error('Something went wrong while Signing Up :(');
  }
}
