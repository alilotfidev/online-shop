export function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function getYYYYMMDD() {
  const dateObj = new Date();

  const year = dateObj.getFullYear();
  //getMonth returns 0-11, so add 1 for proper month representation
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');

  return year + month + day;
}

export function getISODateString() {
  const dateObj = new Date();

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Add 1 for proper month
  const day = String(dateObj.getDate()).padStart(2, '0');

  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getSeconds()).padStart(2, '0');
  const milliseconds = String(dateObj.getMilliseconds()).padStart(3, '0');

  // Include milliseconds (optional for ISO 8601 but commonly used)
  return (
    year +
    '-' +
    month +
    '-' +
    day +
    'T' +
    hours +
    ':' +
    minutes +
    ':' +
    seconds +
    '.' +
    milliseconds +
    'Z'
  );
}
