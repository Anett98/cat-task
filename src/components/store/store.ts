import { configureStore } from "@reduxjs/toolkit";
import categoriesListSlice from "./catergriesSlice";
import imagesSlice from './catsByCategorySlice'

const store = configureStore({
  reducer: {
    categories: categoriesListSlice,
    images: imagesSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
