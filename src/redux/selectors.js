import { createSelector } from '@reduxjs/toolkit';

export const selectCampersList = state => state.campers.campers;
export const selectFilters = state => state.campers.filters;
export const selectFavorites = state => state.campers.favorites;
export const selectSelectedCamper = state => state.campers.selectedCamper;
export const selectLoading = state => state.campers.loading;
export const selectError = state => state.campers.error;

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

export const selectIsFavorite = camperId =>
  createSelector([selectFavorites], favorites =>
    favorites.some(fav => fav.id === camperId)
  );
