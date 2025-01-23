import axios from 'axios';
import { UNSPLASH_API_URL, ACCESS_KEY } from './config';

export const fetchImages = async () => {
  try {
    const response = await axios.get(UNSPLASH_API_URL, {
      params: { client_id: ACCESS_KEY },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching images');
  }
};