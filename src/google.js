import axios from 'axios';

export async function getGoogleHomePage() {
  return await axios.get(
    `https://google.com`);
}