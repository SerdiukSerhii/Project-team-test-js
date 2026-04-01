export function initFurnitureSection() {
    console.log("Секція меблів завантажена!");
}


//! ============= submit ======================================

refs.formElem.addEventListener('submit', async e => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const query = formData.get('search-text').trim();

  if (!query) {
    iziToast.error({
      message: 'Please enter a search query!',
      position: 'topRight',
      icon: false,
    });
    return;
  }

  currentQuery = query;
  page = 1;

  clearGallery();
  hidePagination();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    totalPages = Math.ceil(data.totalHits / PER_PAGE);

    if (!data.hits.length) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        color: '#98a8d4ff',
        icon: false,
      });

      refs.paginationContainer.innerHTML = '';

      return;
    }

    createGallery(data.hits);
    renderPagination(page, totalPages);
    showPagination();

    if (page >= totalPages) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }
  } catch {
    iziToast.error({
      message: 'Error fetching images. Please try again later.',
      position: 'topRight',
      icon: false,
    });
  } finally {
    hideLoader();
  }

  refs.formElem.reset();
});
