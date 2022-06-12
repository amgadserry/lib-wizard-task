import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  Error,
  errorPayloadContainsNoValidationErrors,
  validateGenre,
  validateInformationPayload,
  validateSubGenre,
  validateSubGenrePayload,
} from "./domain/validation";
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

export type SubgenrePayload = {
  name: string;
  isDescriptionRequired: boolean;
};

export type BookPayload = {
  genreId: number;
  subGenreId?: number;
  subGenrePayload?: SubgenrePayload;
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
  errors:
    | string
    | Error<Partial<SubgenrePayload>>
    | Error<Partial<BookPayloadInformation>>
    | null;
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
  },
  {
    condition: (_, { getState }) =>
      (getState() as RootState).wizard.errors === null,
  }
);

const initialState: WizardState = {
  currentStep: 0,
  errors: null,
  payload: {
    genreId: 0,
    informationPayload: {
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
      state.payload = {
        ...state.payload,
        ...action.payload,
      };
      state.errors = null;
    },
    setSubgenrePayload: (
      state,
      action: PayloadAction<Partial<SubgenrePayload>>
    ) => {
      state.payload.subGenrePayload = {
        ...state.payload.subGenrePayload,
        ...action.payload,
      } as SubgenrePayload;
      state.errors = null;
    },
    setBookInformationPayload: (
      state,
      action: PayloadAction<Partial<BookPayloadInformation>>
    ) => {
      state.payload.informationPayload = {
        ...state.payload.informationPayload,
        ...action.payload,
      } as BookPayloadInformation;
      state.errors = null;
    },
    reset: () => initialState,
    tryNextStep: (state) => {
      const error = (() => {
        if (state.currentStep === 0) {
          return validateGenre(state.payload);
        } else if (state.currentStep === 1) {
          return validateSubGenre(state.payload);
        } else if (state.currentStep === 2 && !!state.payload.subGenrePayload) {
          return validateSubGenrePayload(state.payload.subGenrePayload);
        } else {
          return validateInformationPayload(
            state.payload.informationPayload,
            _selectIsDescriptionRequired(state)
          );
        }
      })();

      if (
        (typeof error === "object" &&
          error !== null &&
          !errorPayloadContainsNoValidationErrors(error as Error<any>)) ||
        (typeof error === "string" && error !== null)
      ) {
        console.log("here");
        state.errors = error;
      } else {
        state.errors = null;
        const steps = _selectSteps(state);
        if (state.currentStep + 1 < steps.length) {
          state.currentStep += 1;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitBookAsync.pending, (state) => {
        state.status = "submitting";
      })
      .addCase(submitBookAsync.fulfilled, (state) => {
        state.status = "submitted";
      })
      .addCase(submitBookAsync.rejected, (state) => {
        state.status = "idle";
      });
  },
});

export const {
  tryBack,
  setPayload,
  setSubgenrePayload,
  setBookInformationPayload,
  reset,
  tryNextStep,
} = wizardSlice.actions;

const _selectIsDescriptionRequired = (state: WizardState) => {
  if (!!state.payload.subGenreId) {
    return true;
  } else if (!!state.payload.subGenrePayload) {
    return state.payload.subGenrePayload!.isDescriptionRequired;
  } else {
    return false;
  }
};

export const selectIsDescriptionRequired = (state: RootState) =>
  _selectIsDescriptionRequired(state.wizard);
export const selectCurrentStep = (state: RootState) => state.wizard.currentStep;
export const selectSubmissionStatus = (state: RootState) => state.wizard.status;
export const selectPayload = (state: RootState) => state.wizard.payload;
export const selectSubgenrePayload = (state: RootState) =>
  state.wizard.payload.subGenrePayload;
export const selectBookInformationPayload = (state: RootState) =>
  state.wizard.payload.informationPayload;
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
