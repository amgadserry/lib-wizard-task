import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/store";
import { StatusString } from "../../../../components/status/StatusHandler";
import { selectPayload } from "../../wizardSlice";
import { fetchSubgenres, SubgenreResponse } from "./subgenreAPI";

export interface SubgenerSliceState {
  data: SubgenreResponse;
  genreId: number;
  status: StatusString;
}

const initialState: SubgenerSliceState = {
  data: [],
  genreId: 0,
  status: "idle",
};

export const fetchSubgenresAsync = createAsyncThunk(
  "subgenre/fetchSubgenres",
  async (_, { getState }) => {
    const genreId = selectPayload(getState() as RootState).genreId;
    const response = await fetchSubgenres(genreId);
    return { genreId, data: response.data };
  },
  {
    condition: (_, { getState }) =>
      selectGenreIdForSubgenresLoaded(getState() as RootState) !==
      selectPayload(getState() as RootState).genreId,
  }
);

export const subgenresSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubgenresAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubgenresAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload.data;
        state.genreId = action.payload.genreId;
      })
      .addCase(fetchSubgenresAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectSubgenresState = (state: RootState) => state.subgenres;
export const selectSubgenreStatus = (state: RootState) =>
  state.subgenres.status;
export const selectGenreIdForSubgenresLoaded = (state: RootState) =>
  state.subgenres.genreId;

export default subgenresSlice.reducer;
