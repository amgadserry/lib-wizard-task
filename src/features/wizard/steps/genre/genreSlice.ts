import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "../../../../dummy-data";
import { fetchGenres } from "./genreAPI";

export interface GenerSlice {
  data: typeof data.genres;
  status: "idle" | "loading" | "failed";
}

const initialState: GenerSlice = {
  data: [],
  status: "loading",
};

export const fetchGenresAsync = createAsyncThunk(
  "genre/fetchGenre",
  async () => {
    const response = await fetchGenres();
    return response.data;
  }
);

export const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenresAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGenresAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(fetchGenresAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default genreSlice.reducer;
