const baseUrl = `${process.env.CONTENTFUL_READ_ONLY_BASE_URL}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT_ID}`;
const urlAuthPart = `access_token=${process.env.CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN}`;


const createUrl = (url, queries = []) => {
  //creating queries part
  const queriesUrl = '?';
  queries.forEach(query => {
    queriesUrl += `${query}&`;
  });
  queriesUrl += urlAuthPart;

  
  const finalUrl = baseUrl + url + queriesUrl;
  return finalUrl;
}



// request functions
export async function getSingleEntry(entryID) {
  const res = await fetch(createUrl(`/entries/${entryID}`));

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getEntries(contentType) {
  const res = await fetch(createUrl(`/entries`, [`content_type=${contentType}`]));

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

