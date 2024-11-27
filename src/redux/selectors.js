import { createSelector } from '@reduxjs/toolkit';

// Базові селектори
export const selectCampersList = state => state.campers.campers;
export const selectFilters = state => state.campers.filters;
export const selectFavorites = state => state.campers.favorites;
export const selectSelectedCamper = state => state.campers.selectedCamper;
export const selectLoading = state => state.campers.loading;
export const selectError = state => state.campers.error;

// Селектор для відфільтрованих кемперів
export const selectFilteredCampers = createSelector(
  [selectCampersList, selectFilters],
  (campers, filters) => {
    return campers.filter(camper => {
      return Object.entries(filters).every(
        ([key, value]) => camper[key] === value
      );
    });
  }
);

// Селектор для перевірки, чи кемпер в обраних
export const selectIsFavorite = camperId =>
  createSelector([selectFavorites], favorites =>
    favorites.some(fav => fav.id === camperId)
  );
