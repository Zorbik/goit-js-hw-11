import { apiService } from '../index';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function showNumFindImg(totalHits) {
  if (totalHits > 0 && totalHits < 500 && apiService.currentPage === 1) {
    Notify.success(`Hooray! We found ${totalHits} images.`);
  } else if (totalHits === 500 && apiService.currentPage === 1) {
    Notify.success(`Hooray! We found ${totalHits + 20} images.`);
  }
}

export function showMessage(string) {
  switch (string) {
    case 'failure':
      Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`
      );
      break;
    case 'info':
      Notify.info(`We're sorry, but you've reached the end of search results.`);
      break;
  }
}
