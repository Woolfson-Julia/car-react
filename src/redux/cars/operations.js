import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axiosConfig";

export const genericErrorMessage =
  "There was an error. Try to update page a bit later";


export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async ({ page = 1, limit = 12, filters = {} }, thunkAPI) => {
    try {
      const params = new URLSearchParams();

      params.append("page", page);
      params.append("limit", limit);

      if (filters.brand) {
        params.append("brand", filters.brand);
      }
      if (filters.price) {
        params.append("rentalPrice", filters.price);
      }
      if (filters.fromMileage) {
        params.append("minMileage", filters.fromMileage);
      }
      if (filters.toMileage) {
        params.append("maxMileage", filters.toMileage);
      }

      const response = await axios.get(`/cars?${params.toString()}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || genericErrorMessage);
    }
  }
);
export const fetchCarById = createAsyncThunk(
  "cars/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/cars/${id}`);
      return response.data; // просто объект машины
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || genericErrorMessage);
    }
  }
);
export const fetchBrands = createAsyncThunk(
  "cars/fetchBrands",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/brands");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || genericErrorMessage);
    }
  }
);
