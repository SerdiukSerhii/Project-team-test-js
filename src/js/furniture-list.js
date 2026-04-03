// import { fetchCategories, fetchFurniture } from './furniture-api.js';
// import {
//   createCategoriesMarkup,
//   createFurnitureMarkup,
// } from './furniture-render.js';

// const categoriesList = document.querySelector('#categories');
// const furnitureList = document.querySelector('#furniture-list');
// const loadMoreBtn = document.querySelector('#load-more');
// const loader = document.querySelector('#loader');

// let currentCategory = '';
// let currentPage = 1;

// // ---------------- categories ----------------

// const CATEGORIES_ORDER = [
//   'Всі товари',
//   'М’які меблі',
//   'Шафи та системи зберігання',
//   'Ліжка та матраци',
//   'Столи',
//   'Стільці та табурети',
//   'Кухні',
//   'Меблі для дитячої',
//   'Меблі для офісу',
//   'Меблі для передпокою',
//   'Меблі для ванної кімнати',
//   'Садові та вуличні меблі',
//   'Декор та аксесуари',
// ];

// export async function initCategories() {
//   try {
//     loader.classList.remove('hidden');
//     const apiCategories = await fetchCategories();

//     const finalCategories = CATEGORIES_ORDER.map(name => {
//       const found = apiCategories.find(c => c.name.trim() === name.trim());
//       return {
//         _id: name === 'Всі товари' ? '' : found ? found._id : 'temp-id',
//         name: name,
//       };
//     });

//     categoriesList.innerHTML = createCategoriesMarkup(finalCategories);

//     const firstBtn = categoriesList.querySelector('.category-btn');
//     if (firstBtn) firstBtn.classList.add('is-active');

//     await renderFurnitureSection('', 1);
//   } catch (error) {
//     console.error(error);
//   } finally {
//     loader.classList.add('hidden');
//   }
// }

// // ----------------  render-furniture  ---------------

// export async function renderFurnitureSection(category = '', page = 1) {
//   try {
//     loader.classList.remove('hidden');
//     currentCategory = category;
//     currentPage = page;

//     const data = await fetchFurniture(category, page);
//     const items = data?.furnitures || [];

//     const totalPages = data?.totalPages || 1;

//     if (page === 1) {
//       furnitureList.innerHTML = createFurnitureMarkup(items);
//     } else {
//       furnitureList.insertAdjacentHTML(
//         'beforeend',
//         createFurnitureMarkup(items)
//       );
//     }

//     const paginationWrapper = document.querySelector('.btn-pagination-wrapper');

//     if (page >= totalPages || items.length === 0) {
//       paginationWrapper.classList.add('hidden');
//     } else {
//       paginationWrapper.classList.remove('hidden');
//     }
//   } catch (error) {
//     console.error('Помилка при завантаженні меблів:', error);
//     furnitureList.innerHTML = '<p>Щось пішло не так</p>';
//     document.querySelector('.pagination-wrapper').classList.add('hidden');
//   } finally {
//     loader.classList.add('hidden');
//   }
// }

// // ---------------- categories click ----------------
// async function handleCategoryClick(event) {
//   const clickedBtn = event.target.closest('.category-btn');
//   if (!clickedBtn) return;

//   const currentActive = document.querySelector('.category-btn.is-active');
//   if (currentActive) currentActive.classList.remove('is-active');

//   clickedBtn.classList.add('is-active');

//   currentPage = 1;
//   const categoryId = clickedBtn.dataset.category || '';
//   await renderFurnitureSection(categoryId, currentPage);
// }

// categoriesList.addEventListener('click', handleCategoryClick);

// // ---------------- btn load more ----------------

// loadMoreBtn.addEventListener('click', () => {
//   currentPage += 1;
//   renderFurnitureSection(currentCategory, currentPage);
// });

import { fetchCategories, fetchFurniture } from './furniture-api.js';
import {
  createCategoriesMarkup,
  createFurnitureMarkup,
} from './furniture-render.js';

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

// export async function renderFurnitureSection(category = '', page = 1) {
//   try {
//     loader.classList.remove('hidden');
//     currentCategory = category;
//     currentPage = page;

//     const data = await fetchFurniture(category, page);
//     const items = data?.furnitures || [];
//     const totalPages = data?.totalPages || 1;

//     if (page === 1) {
//       if (items.length === 0) {
//         furnitureList.innerHTML = '<p>Товарів не знайдено</p>';
//       } else {
//         furnitureList.innerHTML = createFurnitureMarkup(items);
//       }
//     } else {
//       furnitureList.insertAdjacentHTML(
//         'beforeend',
//         createFurnitureMarkup(items)
//       );
//     }

//     if (page >= totalPages || items.length === 0 || items.length < 8) {
//       paginationWrapper.classList.add('hidden');
//     } else {
//       paginationWrapper.classList.remove('hidden');
//     }
//   } catch (error) {
//     console.error('Помилка:', error);
//     furnitureList.innerHTML = '<p>Щось пішло не так</p>';
//     paginationWrapper.classList.add('hidden');
//   } finally {
//     loader.classList.add('hidden');
//   }
// }

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

loadMoreBtn.addEventListener('click', async () => {
  // 1. Збільшуємо номер сторінки
  currentPage += 1;

  // 2. Ховаємо кнопку і показуємо лоадер на час запиту
  hideLoadMoreButton();
  showLoader();

  try {
    // 3. Викликаємо твою функцію рендеру (вона сама зробить fetch і insertAdjacentHTML)
    // Передаємо поточну категорію та нову сторінку
    await renderFurnitureSection(currentCategory, currentPage);

    // 4. Логіка плавного скролу (беремо висоту першої картки меблів)
    const firstCard = document.querySelector('.furniture-item');
    if (firstCard) {
      const cardHeight = firstCard.getBoundingClientRect().height;

      window.scrollBy({
        top: cardHeight * 2, // Скролимо на дві висоти картки
        behavior: 'smooth',
      });
    }

    // Примітка: Перевірка на totalPages і показ/приховування кнопки
    // вже мають бути всередині самої функції renderFurnitureSection,
    // тому тут ми їх не дублюємо, щоб не було конфліктів.
  } catch (error) {
    console.error('Error fetching more furniture:', error);
    // Якщо у тебе підключений iziToast, можна додати:
    // iziToast.error({ message: 'Помилка завантаження меблів' });
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
