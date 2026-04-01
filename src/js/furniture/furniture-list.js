import { fetchCategories } from './furniture-api.js';
import { createCategoriesMarkup } from './furniture-render.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const categoriesList = document.querySelector('#categories');
const loader = document.querySelector('#loader');

export async function initCategories() {
  try {
    loader.classList.remove('hidden');

    const categories = await fetchCategories();

    const markup = createCategoriesMarkup(categories);
    categoriesList.innerHTML = markup;

    const firstBtn = categoriesList.querySelector('.category-btn');
    if (firstBtn) firstBtn.classList.add('is-active');
  } catch (error) {
    console.error('Помилка при завантаженні категорій:', error);
  } finally {
    loader.classList.add('hidden');
  }
}

initCategories();

//! ============= submit ======================================
