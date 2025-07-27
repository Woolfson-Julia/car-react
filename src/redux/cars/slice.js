import { createSlice } from "@reduxjs/toolkit";
import { fetchCars, fetchCarById, fetchBrands } from "./operations";

const slice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    car: null,
    loading: false,
    error: null,
    filters: {
      brand: null,
      price: null,
      fromMileage: null,
      toMileage: null,
    },
    favorites: [],
    brands: [],
    allPrices: [],
    page: 1,
    totalPages: 1,
    hasMore: true,
  },
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
      state.page = 1;
      state.items = [];
    },
    addToFavorites(state, action) {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites(state, action) {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
    },
    loadFavorites(state, action) {
      state.favorites = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setAllPrices(state, action) {
      state.allPrices = action.payload;
    },
  },
  extraReducers: (builder) => {
    buildReducers(builder, fetchCars, (state, action) => {
      const page = Number(action.payload.page);
      const totalPages = Number(action.payload.totalPages);
      state.page = page;
      state.totalPages = totalPages;

      const allPrices = action.payload.cars.map((car) =>
        Number(car.rentalPrice)
      );
      const uniqueSorted = Array.from(new Set(allPrices)).sort((a, b) => a - b);

      if (state.allPrices.length === 0) {
        state.allPrices = uniqueSorted;
      }
      if (page === 1) {
        state.items = action.payload.cars;
      } else {
        state.items.push(...action.payload.cars);
      }
    });

    buildReducers(builder, fetchCarById, (state, action) => {
      state.car = action.payload;
    });

    buildReducers(builder, fetchBrands, (state, action) => {
      state.brands = action.payload;
    });
  },
});

function buildReducers(builder, operation, reducerFunc) {
  builder
    .addCase(operation.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(operation.fulfilled, (state, action) => {
      state.loading = false;
      reducerFunc(state, action);
    })
    .addCase(operation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.items = [];
    });
}

export const {
  setFilters,
  setPage,
  addToFavorites,
  removeFromFavorites,
  loadFavorites,
  setAllPrices,
} = slice.actions;

export default slice.reducer;
