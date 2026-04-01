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

// initCategories();

//! ============= submit ======================================

export function handleCategoryClick(event) {
  const clickedBtn = event.target.closest('.category-btn');

  if (!clickedBtn) return;

  const currentActiveBtn = categoriesList.querySelector(
    '.category-btn.is-active'
  );
  if (currentActiveBtn) {
    currentActiveBtn.classList.remove('is-active');
  }

  clickedBtn.classList.add('is-active');

  const selectedCategory = clickedBtn.dataset.category;
  console.log(`Обрана категорія: ${selectedCategory}`);
}

categoriesList.addEventListener('click', handleCategoryClick);

//! ============= submit ======================================

// export async function renderFurnitureSection(category = '', page = 1) {
//   try {
//     loader.classList.remove('hidden');

//     const data = await fetchFurniture(category, page);
//     const markup = createFurnitureMarkup(data.results);

//     furnitureList.innerHTML = markup;
//   } catch (error) {
//     console.error('Помилка завантаження меблів:', error);
//   } finally {
//     loader.classList.add('hidden');
//   }
// }

// function handleCategoryClick(event) {
//   const clickedBtn = event.target.closest('.category-btn');
//   if (!clickedBtn) return;

//   const selectedCategory = clickedBtn.dataset.category;

//   renderFurnitureSection(selectedCategory, 1);
