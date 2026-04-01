import axios from 'axios';

axios.defaults.baseURL = 'https://furniture-store-v2.b.goit.study';

const API_KEY = '55023581-b8ae6332fd3af068fbd1cd850';

export async function getImagesByQuery(query, page) {
  const response = await axios.get('/api-docs/', {
    params: {
      key: API_KEY,
      q: query,
      page: page,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 8,
    },
  });
  return response.data;
}
