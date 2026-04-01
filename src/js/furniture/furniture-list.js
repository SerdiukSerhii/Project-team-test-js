import { fetchCategories, fetchFurniture } from './furniture-api.js';
import {
  createCategoriesMarkup,
  createFurnitureMarkup,
} from './furniture-render.js';

const categoriesList = document.querySelector('#categories');
const furnitureList = document.querySelector('#furniture-list');
const loader = document.querySelector('#loader');

export async function initCategories() {
  try {
    loader.classList.remove('hidden');

    const categories = await fetchCategories();
    categoriesList.innerHTML = createCategoriesMarkup(categories);

    const firstBtn = categoriesList.querySelector('.category-btn');
    if (firstBtn) firstBtn.classList.add('is-active');

    renderFurnitureSection('Всі товари');
  } finally {
    loader.classList.add('hidden');
  }
}

export async function renderFurnitureSection(category = '', page = 1) {
  const data = await fetchFurniture(category, page);
  furnitureList.innerHTML = createFurnitureMarkup(data.results);
}

export function handleCategoryClick(event) {
  const clickedBtn = event.target.closest('.category-btn');
  if (!clickedBtn) return;

  document
    .querySelector('.category-btn.is-active')
    ?.classList.remove('is-active');

  clickedBtn.classList.add('is-active');

  renderFurnitureSection(clickedBtn.dataset.category);
}

categoriesList.addEventListener('click', handleCategoryClick);
