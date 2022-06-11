import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Error, isValidBookPayload, validateGenre } from "./domain/validation";
import { submit } from "./wizardAPI";

export type BookPayloadInformation = {
  title: string;
  authorId?: number;
  isbn?: string;
  publisherId?: number;
  datePublished?: string;
  numberOfPages?: number;
  format?: string;
  edition?: number;
  editionLanguage?: string;
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

export type SuccessfulSubmissionResult = {
  data: BookPayload & { id: number };
};
export type FailedSubmissionResult = {
  errors: Error<Partial<BookPayload>> & {
    informationPayload: Error<Partial<BookPayloadInformation>>;
  };
};
export type SubmissionResult =
  | SuccessfulSubmissionResult
  | FailedSubmissionResult;

export interface WizardState {
  currentStep: number;
  errors: string | string[] | null;
  payload: BookPayload;
  submissionResult?: SubmissionResult;
  status: "submitting" | "idle" | "submitted";
}

export const submitBookAsync = createAsyncThunk<SubmissionResult>(
  "wizard/submitBook",
  async (_, { getState }): Promise<SubmissionResult> => {
    const payload = selectPayload(getState() as RootState);
    const reuslt = await submit(payload);
    return reuslt;
  }
);

const initialState: WizardState = {
  currentStep: 0,
  errors: null,
  payload: {
    genreId: 0,
    informationPayload: {
      authorId: 0,
      datePublished: new Date().toISOString(),
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
    tryBack: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
    },
    setPayload: (state, action: PayloadAction<Partial<BookPayload>>) => {
      state.payload = { ...state.payload, ...action.payload };
      state.errors = null;
    },
    reset: () => initialState,
    tryNextStep: (state) => {
      if (state.currentStep === 0) {
        const error = validateGenre(state.payload);
        if (error !== null) {
          state.errors = error;
        } else {
          const steps = _selectSteps(state);
          if (state.currentStep + 1 < steps.length) {
            state.currentStep += 1;
          }
        }
      }
    },
  },
});

export const { tryBack, setPayload, reset, tryNextStep } = wizardSlice.actions;

export const selectIsDescriptionRequired = (state: RootState) => {
  if (!!state.wizard.payload.subGenreId) {
    return true;
  } else if (!!state.wizard.payload.subGenrePayload) {
    return state.wizard.payload.subGenrePayload!.isDescriptionRequired;
  } else {
    return false;
  }
};
export const selectCurrentStep = (state: RootState) => state.wizard.currentStep;
export const selectSubmissionStatus = (state: RootState) => state.wizard.status;
export const selectPayload = (state: RootState) => state.wizard.payload;
export const selectErrors = (state: RootState) => state.wizard.errors;
export const selectIsNewSubGenre = (state: RootState) =>
  !!state.wizard.payload?.subGenrePayload;

const _selectSteps = (state: WizardState) => {
  const steps = ["Genre", "Subgenre", "Add new subgenre", "Information"];

  if (state.currentStep <= 1) {
    return [...steps.slice(0, 2), null];
  } else if (!state.payload.subGenreId) {
    return steps.concat();
  } else {
    const result = steps.concat();
    result.splice(2, 1);
    return result;
  }
};

export const selectSteps = (state: RootState) => _selectSteps(state.wizard);

export default wizardSlice.reducer;
