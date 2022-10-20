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

function onSearch(event) {
  event.preventDefault();
  apiService.query = event.target.searchQuery.value;
  apiService.resetPage();
  removeMarkup();
  onLoadMore();
}

async function onLoadMore() {
  buttonHidden();
  const response = await apiService.getItems();
  if (
    response.data.totalHits > 0 &&
    response.data.totalHits < 500 &&
    apiService.currentPage === 2
  ) {
    Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
  } else if (response.data.totalHits === 500 && apiService.currentPage === 2) {
    Notify.success(`Hooray! We found ${response.data.totalHits + 20} images.`);
  }
  createMarkup(response.data.hits);
  lightbox.refresh();
}

function createMarkup(array = []) {
  if (!array.length)
    return Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );

  refs.gallery.insertAdjacentHTML('beforeend', galleryItem(array));

  buttonShowen();

  if (apiService.currentPage === 14) {
    buttonHidden();
    return Notify.info(
      `We're sorry, but you've reached the end of search results.`
    );
  }
}

function removeMarkup() {
  refs.gallery.innerHTML = '';
}

function buttonHidden() {
  refs.loadButton.classList.add('isHidden');
}
function buttonShowen() {
  refs.loadButton.classList.remove('isHidden');
}
