import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const furnitureList = document.getElementById('furniture-list');
const categoriesList = document.getElementById('categories');

const lightbox = new SimpleLightbox('.js-gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

// -------------------------- filtering ------------------------

export function createCategoriesMarkup(categories) {
  const allCategories = ['Всі товари', ...categories];

  return allCategories
    .map(category => {
      return `
        <li class="category-item">
          <button class="category-btn" type="button" data-category="${category}">
            ${category}
          </button>
        </li>
      `;
    })
    .join('');
}
