import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.js-gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

export function createCard(item) {
  return `
    <li class="furniture-card" data-id="${item._id}">
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>Колір: ${item.color}</p>
      <span>Ціна: ${item.price} грн</span>
      <button class="details-btn" type="button">Детальніше</button>
    </li>
  `;
}
