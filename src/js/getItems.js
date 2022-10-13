import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { buttonHidden } from '../index';

const BASE_URL = 'https://pixabay.com/api/';

export default class ApiService {
  constructor() {
    this.q = '';
    this.page = 1;
  }
  getItems() {
    const options = {
      key: '30500534-ec5f5c30a1edd00a61f5d8ab9',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    };
    const { key, image_type, orientation, safesearch } = options;

    const url = `${BASE_URL}?key=${key}&q=${this.q}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}&per_page=40&page=${this.page}`;

    try {
      const response = axios.get(url);
      this.increasePage();

      console.log(`~ this.page`, this.page);

      return response;
    } catch (error) {
      console.error(error);
    }
  }
  get query() {
    return this.q;
  }
  set query(searchQuery) {
    this.q = searchQuery;
  }
  increasePage() {
    this.page += 1;
    if (this.page > 13) {
      buttonHidden();
      return Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );
    }
  }
  resetPage() {
    this.page = 1;
  }
}
