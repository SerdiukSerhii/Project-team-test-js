import { fetchCategories, fetchFurniture } from './furniture-api.js';
import {
  createCategoriesMarkup,
  createFurnitureMarkup,
} from './furniture-render.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const categoriesList = document.querySelector('#categories');
const furnitureList = document.querySelector('#furniture-list');
const loadMoreBtn = document.querySelector('#load-more');
const loader = document.querySelector('#loader');

const paginationWrapper = document.querySelector('.btn-pagination-wrapper');

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
    const totalPages = data?.totalPages || 1;

    console.log(
      `Page: ${page}, TotalPages: ${totalPages}, Items: ${items.length}`
    );

    if (page === 1) {
      furnitureList.innerHTML =
        items.length > 0
          ? createFurnitureMarkup(items)
          : '<p>Товарів не знайдено</p>';
    } else {
      furnitureList.insertAdjacentHTML(
        'beforeend',
        createFurnitureMarkup(items)
      );
    }

    if (items.length === 8 && page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }

    if (page > 1 && page >= totalPages) {
      console.log('Ви досягли кінця списку');
    }
  } catch (error) {
    console.error('Помилка:', error);
    hideLoadMoreButton();
    furnitureList.innerHTML = '<p>Сталася помилка</p>';
  } finally {
    hideLoader();
  }
}

// ---------------- events ----------------
async function handleCategoryClick(event) {
  const clickedBtn = event.target.closest('.category-btn');
  if (!clickedBtn) return;

  document
    .querySelector('.category-btn.is-active')
    ?.classList.remove('is-active');
  clickedBtn.classList.add('is-active');

  currentPage = 1;
  const categoryId = clickedBtn.dataset.category || '';
  await renderFurnitureSection(categoryId, currentPage);
}

categoriesList.addEventListener('click', handleCategoryClick);

// ------------------------------ load more----------------------

// loadMoreBtn.addEventListener('click', async () => {
//   currentPage += 1;

//   hideLoadMoreButton();
//   showLoader();

//   try {
//     await renderFurnitureSection(currentCategory, currentPage);

//     const firstCard = document.querySelector('.furniture-item');
//     if (firstCard) {
//       const cardHeight = firstCard.getBoundingClientRect().height;

//       window.scrollBy({
//         top: cardHeight * 2,
//         behavior: 'smooth',
//       });
//     }
//   } catch (error) {
//     console.error('Error fetching more furniture:', error);
//   } finally {
//     hideLoader();
//   }
// });

// function showLoader() {
//   loader.classList.add('is-visible');
// }

// function hideLoader() {
//   loader.classList.remove('is-visible');
// }

// function showLoadMoreButton() {
//   loadMoreBtn.classList.add('is-visible');
// }

// function hideLoadMoreButton() {
//   loadMoreBtn.classList.remove('is-visible');
// }

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;

  hideLoadMoreButton();
  showLoader();

  try {
    const data = await renderFurnitureSection(currentCategory, currentPage);

    if (currentPage >= data.totalPages || data.items.length === 0) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of the catalog.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }

    const firstCard = document.querySelector('.furniture-item');
    if (firstCard) {
      const cardHeight = firstCard.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
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
  loadMoreBtn.classList.remove('is-hidden');
}

function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}
