import PocketBase from 'pocketbase';

// For server-side usage
export function getPocketBase() {
  const pb = new PocketBase(process.env.POCKETBASE_URL);
  return pb;
}