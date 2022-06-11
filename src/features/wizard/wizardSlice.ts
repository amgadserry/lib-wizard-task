import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type BookPayloadInformation = {
  title: string;
  authorId: number;
  isbn: string;
  publisherId: number;
  datePublished: Date;
  numberOfPages: number;
  format: string;
  edition: number;
  editionLanguage: string;
  description?: string;
};

export type BookPayload = {
  genreId: number;
  subGenreId?: number;
  subGenrePayload?: {
    name: string;
    isDescriptionRequired: boolean;
  };
  informationPayload: BookPayloadInformation;
};

export interface WizardState {
  currentStep: number;
  payload: BookPayload;
  status: "submitting" | "idle" | "submitted";
}

const initialState: WizardState = {
  currentStep: 0,
  payload: {
    genreId: 0,
    informationPayload: {
      authorId: 0,
      datePublished: new Date(),
      edition: 0,
      editionLanguage: "",
      format: "",
      isbn: "",
      numberOfPages: 0,
      publisherId: 0,
      title: "",
    },
  },
  status: "idle",
};

export const wizardSlice = createSlice({
  name: "wizard",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      if (state.currentStep > action.payload) {
        state.currentStep = action.payload;
      }
    },
    setPayload: (state, action: PayloadAction<Partial<BookPayload>>) => {
      state.payload = { ...state.payload, ...action.payload };
    },
    reset: () => initialState,
  },
});

export const { setCurrentStep, setPayload, reset } = wizardSlice.actions;

export const selectCurrentStep = (state: RootState) => state.wizard.currentStep;
export const selectSubmissionStatus = (state: RootState) => state.wizard.status;
export const selectPayload = (state: RootState) => state.wizard.payload;
export const selectIsNewSubGenre = (state: RootState) =>
  !!state.wizard.payload?.subGenrePayload;
export const selectSteps = (state: RootState) => {
  const steps = ["Genre", "Subgenre", "Add new subgenre", "Information"];

  if (state.wizard.currentStep <= 1) {
    return [...steps.slice(0, 2), null];
  } else if (!state.wizard.payload.subGenreId) {
    return steps.concat();
  } else {
    const result = steps.concat();
    result.splice(2, 1);
    return result;
  }
};

export default wizardSlice.reducer;
