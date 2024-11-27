import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCampers = createAsyncThunk(
  'campers/fetchCampers',
  async (filters, { rejectWithValue, dispatch }) => {
    dispatch(resetCampers());
    const queryParams = new URLSearchParams(filters).toString();
    try {
      const response = await fetch(
        `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers?${queryParams}`
      );
      if (!response.ok) {
        return rejectWithValue('Failed to fetch campers');
      }
      const data = await response.json();
      return data.items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  'campers/fetchCamperById',
  async id => {
    const response = await fetch(
      `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`
    );
    return await response.json();
  }
);

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    campers: [],
    selectedCamper: null,
    loading: false,
    error: null,
    filters: {},
    favorites: [],
  },
  reducers: {
    resetFilters(state) {
      state.filters = {};
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
    toggleFavorite(state, action) {
      const camper = action.payload;
      const index = state.favorites.findIndex(fav => fav.id === camper.id);
      if (index === -1) {
        state.favorites.push(camper);
      } else {
        state.favorites.splice(index, 1);
      }
    },
    resetCampers(state) {
      state.campers = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCampers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.campers = action.payload;
        state.loading = false;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCamperById.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCamper = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetFilters, setFilters, toggleFavorite, resetCampers } =
  campersSlice.actions;
export default campersSlice.reducer;
