import axios from 'axios';

const UNSPLASH_API_URL = 'https://api.unsplash.com/photos';
const ACCESS_KEY = 'nm1FqAmcGX-0x-GtClZyX7gJxPEUeYYBeNixxWVJwHA';

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