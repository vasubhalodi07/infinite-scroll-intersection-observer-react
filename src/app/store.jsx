import { configureStore } from "@reduxjs/toolkit";
import imageSlice from "../redux/imageSlice";

const store = configureStore({
  reducer: {
    imageKey: imageSlice,
  },
});

export default store;
