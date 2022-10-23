import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

export default class ApiService {
  constructor() {
    this.q = '';
    this.page = 1;
  }
  async getItems() {
    try {
      const response = await axios.get(`${BASE_URL}`, {
        params: {
          key: '30500534-ec5f5c30a1edd00a61f5d8ab9',
          q: this.q,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: 40,
          page: this.page,
        },
      });
      return response.data;
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
  get currentPage() {
    return this.page;
  }
  increasePage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
