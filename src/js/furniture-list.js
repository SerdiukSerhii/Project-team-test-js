import { fetchCategories, fetchFurniture } from './furniture-api.js';
import {
  createCategoriesMarkup,
  createFurnitureMarkup,
} from './furniture-render.js';

const categoriesList = document.querySelector('#categories');
const furnitureList = document.querySelector('#furniture-list');
const loadMoreBtn = document.querySelector('#load-more');
const loader = document.querySelector('#loader');

let currentCategory = '';
let currentPage = 1;

// ---------------- categories ----------------

// 1. Еталонний порядок (якщо його ще немає на початку файлу)
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

export async function initCategories() {
  try {
    loader.classList.remove('hidden');
    const apiCategories = await fetchCategories();

    // ГОРУЄМО ДАНІ: жодних ручних пушів, тільки мапінг за еталоном
    const finalCategories = CATEGORIES_ORDER.map(name => {
      const found = apiCategories.find(c => c.name.trim() === name.trim());
      return {
        _id: name === 'Всі товари' ? '' : found ? found._id : 'temp-id',
        name: name,
      };
    });

    // Рендеримо чистий список
    categoriesList.innerHTML = createCategoriesMarkup(finalCategories);

    // Ставимо активний стан на ПЕРШУ кнопку ("Всі товари")
    const firstBtn = categoriesList.querySelector('.category-btn');
    if (firstBtn) firstBtn.classList.add('is-active');

    // Перше завантаження меблів (Всі товари)
    await renderFurnitureSection('', 1);
  } catch (error) {
    console.error(error);
  } finally {
    loader.classList.add('hidden');
  }
}

// 2. ОБРОБНИК КЛІКУ (додай це ПІСЛЯ функції initCategories)
// categoriesList.addEventListener('click', async event => {
//   const btn = event.target.closest('.category-btn');
//   if (!btn) return;

//   // Знімаємо акцент з усіх і додаємо на клікнуту
//   const allBtns = categoriesList.querySelectorAll('.category-btn');
//   allBtns.forEach(b => b.classList.remove('is-active'));
//   btn.classList.add('is-active');

//   // Фільтруємо меблі
//   const categoryId = btn.dataset.category;
//   await renderFurnitureSection(categoryId, 1);
// });

// export async function initCategories() {
//   try {
//     loader.classList.remove('hidden');

//     const categories = await fetchCategories();
//     const allCategories = [{ name: 'Всі товари', _id: '' }, ...categories];

//     categoriesList.innerHTML = createCategoriesMarkup(allCategories);

//     const firstBtn = categoriesList.querySelector('.category-btn');
//     if (firstBtn) firstBtn.classList.add('is-active');
//     await renderFurnitureSection('', 1);
//   } finally {
//     loader.classList.add('hidden');
//   }
// }

// ----------------  render-furniture  ---------------

// export async function renderFurnitureSection(category = '', page = 1) {
//   try {
//     loader.classList.remove('hidden');
//     currentCategory = category;
//     currentPage = page;

//     const data = await fetchFurniture(category, page);
//     const items = data?.furnitures || [];

//     if (page === 1) {
//       furnitureList.innerHTML = createFurnitureMarkup(items);
//     } else {
//       furnitureList.insertAdjacentHTML(
//         'beforeend',
//         createFurnitureMarkup(items)
//       );
//     }

//     if (!items.length || items.length < 8) {
//       loadMoreBtn.classList.add('hidden');
//     } else {
//       loadMoreBtn.classList.remove('hidden');
//     }
//   } catch (error) {
//     console.error('Помилка при завантаженні меблів:', error);
//     furnitureList.innerHTML = '<p>Щось пішло не так</p>';
//     loadMoreBtn.classList.add('hidden');
//   } finally {
//     loader.classList.add('hidden');
//   }
// }

export async function renderFurnitureSection(category = '', page = 1) {
  try {
    loader.classList.remove('hidden');
    currentCategory = category;
    currentPage = page;

    const data = await fetchFurniture(category, page);
    const items = data?.furnitures || [];

    const totalPages = data?.totalPages || 1;

    if (page === 1) {
      furnitureList.innerHTML = createFurnitureMarkup(items);
    } else {
      furnitureList.insertAdjacentHTML(
        'beforeend',
        createFurnitureMarkup(items)
      );
    }

    const paginationWrapper = document.querySelector('.btn-pagination-wrapper');

    if (page >= totalPages || items.length === 0) {
      paginationWrapper.classList.add('hidden');
    } else {
      paginationWrapper.classList.remove('hidden');
    }
  } catch (error) {
    console.error('Помилка при завантаженні меблів:', error);
    furnitureList.innerHTML = '<p>Щось пішло не так</p>';
    document.querySelector('.pagination-wrapper').classList.add('hidden');
  } finally {
    loader.classList.add('hidden');
  }
}

// ---------------- categories click ----------------
async function handleCategoryClick(event) {
  const clickedBtn = event.target.closest('.category-btn');
  if (!clickedBtn) return;

  // Знімаємо активний клас
  const currentActive = document.querySelector('.category-btn.is-active');
  if (currentActive) currentActive.classList.remove('is-active');

  // Додаємо активний клас
  clickedBtn.classList.add('is-active');

  // Скидаємо сторінку і рендеримо
  currentPage = 1;
  const categoryId = clickedBtn.dataset.category || '';
  await renderFurnitureSection(categoryId, currentPage);
}

// ПЕРЕКОНАЙСЯ, ЩО ЦЕЙ РЯДОК У ФАЙЛІ ТІЛЬКИ ОДИН РАЗ
categoriesList.addEventListener('click', handleCategoryClick);

// ---------------- btn load more ----------------

loadMoreBtn.addEventListener('click', () => {
  currentPage += 1;
  renderFurnitureSection(currentCategory, currentPage);
});
