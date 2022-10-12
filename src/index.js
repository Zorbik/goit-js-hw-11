import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import InfiniteScroll from 'infinite-scroll';
import galleryItem from './templates/gallery_item.hbs';
import ApiService from './js/getItems';

const apiService = new ApiService();

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadButton: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSearch);
refs.loadButton.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  apiService.query = event.currentTarget.elements.searchQuery.value;
  apiService.resetPage();

  const response = await apiService.getItems();
  console.log(`~ response`, response);

  // removeMarkup();
  createMarkup(response.data.hits);
  toggleClassButton();
}

async function onLoadMore() {
  toggleClassButton();
  const response = await apiService.getItems();
  console.log(`~ response`, response);

  // createMarkup(response.data.hits);
  toggleClassButton();
}

function createMarkup(array) {
  if (!array.length)
    return Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );

  refs.gallery.insertAdjacentHTML('beforeend', galleryItem(array));
}

function removeMarkup() {
  refs.gallery.innerHTML = '';
}

export function toggleClassButton() {
  refs.loadButton.classList.toggle('isHidden');
}

let lightbox = new SimpleLightbox('.gallery gallery__link', {
  captionsData: 'alt',
  captionDelay: 250,
});

// let infScroll = new InfiniteScroll('.container');
// infScroll.loadNextPage(onLoadMore);
