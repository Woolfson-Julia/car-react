import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
  fetchCars,
  fetchCarById,
  fetchBrands
} from "./operations";
import toast from "react-hot-toast";

const carsListenerMiddleware = createListenerMiddleware();

carsListenerMiddleware.startListening({
  actionCreator: fetchCars.rejected,
  effect: async () => {
    toast.error("Failed to load the cars");
  },
});

carsListenerMiddleware.startListening({
  actionCreator: fetchCarById.rejected,
  effect: async () => {
    toast.error("Failed to load the car details");
  },
});

carsListenerMiddleware.startListening({
  actionCreator: fetchBrands.rejected,
  effect: async () => {
    toast.error("Failed to load the brands");
  },
});

export default carsListenerMiddleware;
