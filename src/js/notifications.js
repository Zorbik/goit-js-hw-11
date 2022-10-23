import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const notify = {
  types: { fail: 'failure', info: 'info', success: 'success' },
  messages: {
    found: total =>
      total < 500
        ? `Hooray! We found ${total} images.`
        : `Hooray! We found ${total + 20} images.`,
    noImages: `Sorry, there are no images matching your search query. Please try again.`,
    searchEnd: `We're sorry, but you've reached the end of search results.`,
  },
};

export function showMessage(message = '', type = 'info', timeout = 3000) {
  Notify[type](message, { timeout });
}
