import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let imageState = {
  image: [],
  error: "",
  loading: false,
  hasMore: true,
  offset: 0,
};

export const fetchImage = createAsyncThunk("image/fetch", async (offset) => {
  const response = await axios.get(
    `https://api.slingacademy.com/v1/sample-data/photos?offset=${offset}&limit=20`
  );
  return response.data;
});

const imageSlice = createSlice({
  name: "image",
  initialState: imageState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchImage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

        if (state.offset > action.payload.total_photos) {
          state.hasMore = false;
        }

        if (state.offset === 0) {
          state.image = action.payload.photos;
        } else {
          state.image = [...state.image, ...action.payload.photos];
        }
        state.offset = state.offset + 20;
      })
      .addCase(fetchImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.image = [];
      });
  },
});

export default imageSlice.reducer;
