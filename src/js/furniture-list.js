import { fetchCategories, fetchFurniture } from './furniture-api.js';
import {
  createCategoriesMarkup,
  createFurnitureMarkup,
} from './furniture-render.js';

const categoriesList = document.querySelector('#categories');
const furnitureList = document.querySelector('#furniture-list');
const loadMoreBtn = document.querySelector('#load-more');
const loader = document.querySelector('#loader');


let currentCategory = ''
let currentPage = 1;

// ---------------- categories ----------------

export async function initCategories() {
  try {
    loader.classList.remove('hidden');


    const categories = await fetchCategories();
    const allCategories = [{ name: 'Всі товари', _id: '' }, ...categories];

    categoriesList.innerHTML = createCategoriesMarkup(allCategories);


    const firstBtn = categoriesList.querySelector('.category-btn');
    if (firstBtn) firstBtn.classList.add('is-active');
         await renderFurnitureSection('', 1);
  } finally {
    loader.classList.add('hidden');
  }
}

// ----------------  render-furniture  ---------------

export async function renderFurnitureSection(category = '', page = 1) {
  try {
    loader.classList.remove('hidden');
    currentCategory = category;
    currentPage = page;

    const data = await fetchFurniture(category, page);
    const items = data?.furnitures || [];

    console.log('Items:', items);

    if (page === 1) {
      furnitureList.innerHTML = createFurnitureMarkup(items);
    } else {
      furnitureList.insertAdjacentHTML(
        'beforeend',
        createFurnitureMarkup(items)
      );
    }


    if (!items.length || items.length < 8) {
      loadMoreBtn.classList.add('hidden');
    } else {
      loadMoreBtn.classList.remove('hidden');
    }

  } catch (error) {
    console.error('Помилка при завантаженні меблів:', error);
    furnitureList.innerHTML = '<p>Щось пішло не так</p>';
    loadMoreBtn.classList.add('hidden');
  } finally {
    loader.classList.add('hidden');
  }
}


// ---------------- categories click ----------------

function handleCategoryClick(event) {
  const clickedBtn = event.target.closest('.category-btn');
  if (!clickedBtn) return;

  document.querySelector('.category-btn.is-active')
    ?.classList.remove('is-active');

  clickedBtn.classList.add('is-active');


  currentPage = 1;
  renderFurnitureSection(clickedBtn.dataset.category, currentPage);
}

categoriesList.addEventListener('click', handleCategoryClick);

// ---------------- btn load more ----------------

loadMoreBtn.addEventListener('click', () => {
  currentPage += 1;
  renderFurnitureSection(currentCategory, currentPage);
});
