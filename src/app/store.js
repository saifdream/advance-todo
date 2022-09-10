import { configureStore } from '@reduxjs/toolkit';
import {apiSlice} from '../features/api/apiSlice';
import filterReducer from '../features/filters/filtersSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    filters: filterReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
});
