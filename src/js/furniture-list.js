import { fetchCategories, fetchFurniture } from './furniture-api.js';
import {
  createCategoriesMarkup,
  createFurnitureMarkup,
  appendFurniture,
} from './furniture-render.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const categoriesList = document.querySelector('#categories');
const furnitureList = document.querySelector('#furniture-list');
const loadMoreBtn = document.querySelector('#load-more');
const loader = document.querySelector('#loader');

let currentCategory = '';
let currentPage = 1;

const CATEGORIES_ORDER = [
  'Всі товари',
  'М’які меблі',
  'Шафи та системи зберігання',
  'Ліжка та матраци',
  'Столи',
  'Стільці та табурети',
  'Кухні',
  'Меблі для дитячої',
  'Меблі для офісу',
  'Меблі для передпокою',
  'Меблі для ванної кімнати',
  'Садові та вуличні меблі',
  'Декор та аксесуари',
];

// ---------------- init ----------------
export async function initCategories() {
  try {
    loader.classList.remove('hidden');
    const apiCategories = await fetchCategories();

    const finalCategories = CATEGORIES_ORDER.map(name => {
      const found = apiCategories.find(c => c.name.trim() === name.trim());
      return {
        _id: name === 'Всі товари' ? '' : found ? found._id : 'temp-id',
        name: name,
      };
    });

    categoriesList.innerHTML = createCategoriesMarkup(finalCategories);

    const firstBtn = categoriesList.querySelector('.category-btn');
    if (firstBtn) firstBtn.classList.add('is-active');

    await renderFurnitureSection('', 1);
  } catch (error) {
    console.error(error);
  } finally {
    loader.classList.add('hidden');
  }
}

// ---------------- render ----------------

export async function renderFurnitureSection(category = '', page = 1) {
  try {
    showLoader();

    currentCategory = category;
    currentPage = page;

    const data = await fetchFurniture(category, page);
    const items = data?.furnitures || [];
    const totalItems = data?.totalItems || 0;
    const limit = data?.limit || 8;
    const totalPages = Math.ceil(totalItems / limit);

    if (page === 1) {
      furnitureList.innerHTML = '';
      if (items.length === 0) {
        iziToast.info({ message: 'Товарів не знайдено', position: 'topRight' });
        hideLoadMoreButton();
        return data;
      }
      furnitureList.innerHTML = createFurnitureMarkup(items);
    } else {
      appendFurniture(furnitureList, items);
    }

    if (page >= totalPages || items.length < limit) {
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }

    if (page > 1 && (page >= totalPages || items.length < limit)) {
      iziToast.info({
        message: 'Ви досягли кінця списку',
        position: 'topRight',
      });
    }

    return data;
  } catch (error) {
    hideLoadMoreButton();
    furnitureList.innerHTML = '';
    iziToast.error({
      message: 'Сталася помилка. Спробуйте пізніше',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

async function handleCategoryClick(event) {
  const clickedBtn = event.target.closest('.category-btn');
  if (!clickedBtn) return;

  document
    .querySelector('.category-btn.is-active')
    ?.classList.remove('is-active');

  clickedBtn.classList.add('is-active');

  currentCategory = clickedBtn.dataset.category || '';
  currentPage = 1;

  await renderFurnitureSection(currentCategory, currentPage);
}

categoriesList.addEventListener('click', handleCategoryClick);

// ------------------------------ load more----------------------

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    await renderFurnitureSection(currentCategory, currentPage);

    const firstCard = document.querySelector('.furniture-item');
    if (firstCard) {
      const cardHeight = firstCard.getBoundingClientRect().height;
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }
  } catch (error) {
    iziToast.error({
      message: 'Сталася помилка. Спробуйте пізніше',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

function showLoader() {
  loader.classList.add('is-visible');
}

function hideLoader() {
  loader.classList.remove('is-visible');
}

function showLoadMoreButton() {
  loadMoreBtn.classList.add('is-visible');
}

function hideLoadMoreButton() {
  loadMoreBtn.classList.remove('is-visible');
}
