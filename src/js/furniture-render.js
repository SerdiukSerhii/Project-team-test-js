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

// ----------------------- Card-API---------------------------

export function createFurnitureMarkup(items) {
  return items
    .map(({ _id, img, name, color, price }) => {
      const colors = Array.isArray(color) ? color : [color];

      return `
        <li class="furniture-item" data-id="${_id}">
          <div class="furniture-thumb">
            <img src="${img}" alt="${name}" loading="lazy" />
          </div>
          <div class="furniture-info">
            <h3 class="furniture-heading">${name}</h3>
             <ul class="furniture-color">
              ${colors
                .map(
                  color => `
                <li>
                  <svg width="24" height="24">
                    <circle cx="12" cy="12" r="10" fill="${color}" />
                  </svg>
                </li>
              `
                )
                .join('')}
            </ul>
            <p class="furniture-price">${price} грн</p>
            <button class="details-btn" type="button">Детальніше</button>
          </div>
        </li>
      `;
    })
    .join('');
}
