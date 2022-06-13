import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/store";
import { StatusString } from "../../../../components/status/StatusHandler";
import { fetchGenres, GenreResponse } from "./genreAPI";

export interface GenerSliceState {
  data: GenreResponse;
  status: StatusString;
}

const initialState: GenerSliceState = {
  data: [],
  status: "idle",
};

export const fetchGenresAsync = createAsyncThunk(
  "genre/fetchGenre",
  async () => {
    const response = await fetchGenres();
    return response.data;
  },
  {
    condition: (_, { getState }) => {
      const state = selectGenreState(getState() as RootState);
      return state.status !== "loading" && state.data.length === 0;
    },
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

export const selectGenreState = (state: RootState) => state.genres;
export const selectGenreStatus = (state: RootState) => state.genres.status;

export default genreSlice.reducer;
