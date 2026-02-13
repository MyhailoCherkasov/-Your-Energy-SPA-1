import './css/styles.css';

import {
  loadExerciseCards,
  updateBreadcrumbs,
  initSearch,
  initCardsEventListener,
  initHashtags,
  switchToFavorites,
} from './js/exercises.js';
import { initExerciseModal, closeExerciseModal } from './js/exercise-modal.js';
import { initRatingModal, closeRatingModal } from './js/rating-modal.js';
import { initGlobalNotification } from './js/global-notification.js';
import { initFooterSubscription } from './js/email-validation.js';
import { initHeader } from './js/header.js';
import { displayQuote } from './js/quote.js';

document.addEventListener('DOMContentLoaded', () => {
  const isFavoritesPage = window.location.pathname.includes('favorites.html');

  initExerciseModal();
  initRatingModal();
  initGlobalNotification();
  initHeader();
  initCardsEventListener();
  initFooterSubscription();

  // Quote block is inside exercises partial, so it exists on both pages
  displayQuote();

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeExerciseModal();
      closeRatingModal();
    }
  });

  // FAVORITES PAGE: no hero, no filters/search logic, only favorites rendering
  if (isFavoritesPage) {
    switchToFavorites();
    return;
  }

  // HOME PAGE
  initSearch();
  initHashtags();
  loadExerciseCards('Muscles', 1);

  const filterButtons = document.querySelectorAll(
    '.exercises__content__header-filters-item'
  );

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn =>
        btn.classList.remove('exercises__content__header-filters-item--active')
      );

      button.classList.add('exercises__content__header-filters-item--active');

      const filter = button.getAttribute('data-filter');
      updateBreadcrumbs(null);

      loadExerciseCards(filter, 1);
    });
  });
});
