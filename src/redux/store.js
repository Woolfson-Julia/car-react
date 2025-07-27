import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import carsReducer from "./cars/slice.js";



const carsPersistConfig = {
  key: "cars",
  storage,
  whitelist: ["favorites"],
};

const persistedCarsReducer = persistReducer(carsPersistConfig, carsReducer);

export const store = configureStore({
  reducer: {
    cars: persistedCarsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});

export default store;

export const persistor = persistStore(store);
