import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import genreReducer from "../features/wizard/steps/genre/genreSlice";
import subgenresReducer from "../features/wizard/steps/subgenres/subgenresSlice";
import wizardReducer from "../features/wizard/wizardSlice";

export const store = configureStore({
  reducer: {
    wizard: wizardReducer,
    genres: genreReducer,
    subgenres: subgenresReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
