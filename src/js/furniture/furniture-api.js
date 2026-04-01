import axios from 'axios';

axios.defaults.baseURL = 'https://furniture-store-v2.b.goit.study/api';

// ------------------ filters-API---------------------------

export async function fetchCategories() {
  const response = await axios.get('/categories');
  return response.data;
}
