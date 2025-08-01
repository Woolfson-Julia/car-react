export const selectCars = (state) => state.cars.items;
export const selectCurrentCar = (state) => state.cars.car;
export const selectCarsLoading = (state) => state.cars.loading;
export const selectCarsError = (state) => state.cars.error;
export const selectFavorites = (state) => state.cars.favorites;
export const selectBrands = (state) => state.cars.brands;
export const selectPage = (state) => state.cars.page;
export const selectTotalPage = (state) => state.cars.totalPages;
export const selectFilters = (state) => state.cars.filters;
export const selectAllPrices = (state) => state.cars.allPrices;
