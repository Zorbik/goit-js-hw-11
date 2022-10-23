import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import galleryItem from './templates/gallery_item.hbs';
import ApiService from './js/getItems';
// import { showNumFindImg, showMessage } from './js/notifications';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { notify, showMessage } from './js/notifications';

export const apiService = new ApiService();

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadButton: document.querySelector('.load-more'),
};

const { types, messages } = notify;

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
  const { totalHits, hits } = await apiService.getItems();
  if (totalHits > 0 && apiService.currentPage === 1) {
    showMessage(messages.found(totalHits), types.success);
  }
  renderMarkup(totalHits, hits);
  lightbox.refresh();
}

function renderMarkup(totalHits, hits) {
  if (!hits.length) return showMessage(messages.noImages, types.fail);

  refs.gallery.insertAdjacentHTML('beforeend', galleryItem(hits));

  if (totalHits > 40 && totalHits - apiService.currentPage * 40 <= 0) {
    showMessage(messages.searchEnd, types.info);
    return;
  } else if (totalHits < 40) return;

  apiService.increasePage();
  buttonShown();
}

function removeMarkup() {
  refs.gallery.innerHTML = '';
}

function buttonHidden() {
  refs.loadButton.classList.add('isHidden');
}
function buttonShown() {
  refs.loadButton.classList.remove('isHidden');
}
