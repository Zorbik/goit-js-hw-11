import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import galleryItem from './templates/gallery_item.hbs';
import ApiService from './js/getItems';

const apiService = new ApiService();

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadButton: document.querySelector('.load-more'),
};

let lightbox = new SimpleLightbox('.gallery a');

refs.form.addEventListener('submit', onSearch);
refs.loadButton.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  apiService.query = event.currentTarget.elements.searchQuery.value;
  apiService.resetPage();
  removeMarkup();
  onLoadMore();
}

async function onLoadMore() {
  buttonHidden();
  const response = await apiService.getItems();
  console.log(`~ response`, response);
  if (response.data.totalHits && response.config.url.includes('page=1')) {
    Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
  }
  createMarkup(response.data.hits);
}

function createMarkup(array) {
  if (!array.length)
    return Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );

  refs.gallery.insertAdjacentHTML('beforeend', galleryItem(array));
  lightbox.refresh();
  buttonShowen();
}

function removeMarkup() {
  refs.gallery.innerHTML = '';
}

export function buttonHidden() {
  refs.loadButton.classList.add('isHidden');
}
function buttonShowen() {
  refs.loadButton.classList.remove('isHidden');
}
