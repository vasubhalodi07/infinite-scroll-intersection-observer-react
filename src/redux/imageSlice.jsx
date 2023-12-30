import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let imageState = {
  data: [],
  page: 1,
  isInitialCall: true,
  hasMore: true,
  error: "",
};

export const fetchImage = createAsyncThunk("image/fetch", async (data) => {
  const response = await axios.get(
    `https://dummyjson.com/products?limit=${data.limit}&skip=${
      (data.page - 1) * data.limit
    }`
  );
  return response.data;
});

const imageSlice = createSlice({
  name: "image",
  initialState: imageState,
  reducers: {
    changePage: (state) => {
      state.page = state.page + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchImage.fulfilled, (state, action) => {
        state.loading = false;

        state.isInitialCall = false;
        state.data = [...state.data, ...action.payload.products];
        if (action.payload.skip > action.payload.total) {
          state.hasMore = false;
        }
      })
      .addCase(fetchImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.data = [];
      });
  },
});

export default imageSlice.reducer;
export const { changePage } = imageSlice.actions;
