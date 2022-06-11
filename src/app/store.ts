import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import genreReducer from "../features/wizard/steps/genre/genreSlice";
import wizardReducer from "../features/wizard/wizardSlice";

export const store = configureStore({
  reducer: {
    wizard: wizardReducer,
    counter: counterReducer,
    genres: genreReducer,
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
