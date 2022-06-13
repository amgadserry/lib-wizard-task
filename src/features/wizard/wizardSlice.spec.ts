import { DeepPartial } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { RootState, store } from "../../app/store";
import { submit } from "./wizardAPI";
import wizardReducer, {
  reset,
  selectBookInformationPayload,
  selectCurrentStep,
  selectErrors,
  selectIsDescriptionRequired,
  selectIsNewSubGenre,
  selectPayload,
  selectSteps,
  selectSubgenrePayload,
  selectSubmissionStatus,
  setBookInformationPayload,
  setPayload,
  setSubgenrePayload,
  submitBookAsync,
  tryBack,
  tryNextStep,
  WizardState,
} from "./wizardSlice";

describe("Wizard slice", () => {
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

  it("should initialize with proper values", () => {
    expect(wizardReducer(undefined, { type: "unknown" })).toEqual({
      currentStep: 0,
      errors: null,
      payload: {
        genreId: 0,
        informationPayload: {
          title: "",
        },
      },
      status: "idle",
    });
  });

  it("should fail to move to next step and set error instead", () => {
    const red = wizardReducer(initialState, tryNextStep());

    expect(red.errors).not.toBeNull();
    expect(red.currentStep).toEqual(0);
  });

  it("should properly assign payload data", () => {
    expect(
      wizardReducer(initialState, setPayload({ genreId: 1 })).payload.genreId
    ).toEqual(1);

    expect(
      wizardReducer(initialState, setSubgenrePayload({ name: "name" })).payload
        .subGenrePayload?.name
    ).toEqual("name");

    expect(
      wizardReducer(initialState, setBookInformationPayload({ title: "title" }))
        .payload.informationPayload.title
    ).toEqual("title");
  });

  it("should not be able to move back on initial step", () => {
    const state = wizardReducer(initialState, tryBack());
    expect(state.currentStep).toEqual(0);
  });

  it("should be able to move back on later steps", () => {
    const state = wizardReducer({ ...initialState, currentStep: 1 }, tryBack());
    expect(state.currentStep).toEqual(0);
  });

  it("should move to step 2 on proper data", () => {
    const state = { ...initialState };
    state.payload = { ...state.payload, ...{ genreId: 1 } };
    const red = wizardReducer(state, tryNextStep());

    expect(red.errors).toBeNull();
    expect(red.currentStep).toEqual(1);
  });

  it("should move to step 3 on proper data", () => {
    const state = { ...initialState, ...{ currentStep: 1 } };
    state.payload = {
      ...state.payload,
      ...{
        genreId: 1,
        selectedSubgenreResponse: {
          id: 1,
          name: "smth",
          isDescriptionRequired: false,
        },
      },
    };

    const red = wizardReducer(state, tryNextStep());

    expect(red.errors).toBeNull();
    expect(red.currentStep).toEqual(2);
  });

  it("should move to step 4 on proper data", () => {
    const state = { ...initialState, ...{ currentStep: 2 } };
    state.payload = {
      ...state.payload,
      ...{
        genreId: 1,
        subGenrePayload: { name: "bane", isDescriptionRequired: false },
        informationPayload: { title: "title", description: "" },
      },
    };

    const afterNextState1 = wizardReducer(state, tryNextStep());

    expect(afterNextState1.errors).toBeNull();
    expect(afterNextState1.currentStep).toEqual(3);

    state.payload = {
      ...state.payload,
      ...{
        genreId: 1,
        subGenrePayload: { name: "bane", isDescriptionRequired: true },
        informationPayload: { title: "title", description: "some desc" },
      },
    };

    const afterNextState2 = wizardReducer(state, tryNextStep());

    expect(afterNextState2.errors).toBeNull();
    expect(afterNextState2.currentStep).toEqual(3);
  });

  it("should validate on step 4 and not move on next", () => {
    const state = { ...initialState, ...{ currentStep: 3 } };
    state.payload = {
      ...state.payload,
      ...{
        genreId: 1,
        subGenrePayload: { name: "bane", isDescriptionRequired: false },
        informationPayload: { title: "title", description: "" },
      },
    };

    const afterNextState1 = wizardReducer(state, tryNextStep());

    expect(afterNextState1.errors).toBeNull();
    expect(afterNextState1.currentStep).toEqual(3);
  });

  it("should return valid step count based on subgenre data", () => {
    expect(
      selectSteps({
        wizard: { payload: { subGenrePayload: {} } },
      } as DeepPartial<RootState> as RootState)
    ).toHaveLength(4);
    expect(
      selectSteps({
        wizard: { payload: { selectedSubgenreResponse: {} } },
      } as DeepPartial<RootState> as RootState)
    ).toHaveLength(3);
  });

  it("should be able to reset to initial state", () => {
    const state = wizardReducer(
      {
        currentStep: 2,
        errors: "error",
        payload: {
          genreId: 2,
          informationPayload: {
            title: "title",
          },
        },
        status: "submitted",
      },
      reset()
    );

    expect(state).toEqual(initialState);
  });

  it("should return valid selectIsDescriptionRequired", () => {
    expect(
      selectIsDescriptionRequired({
        wizard: {
          payload: {
            selectedSubgenreResponse: { isDescriptionRequired: false },
          },
        },
      } as DeepPartial<RootState> as RootState)
    ).toBeFalsy();
    expect(
      selectIsDescriptionRequired({
        wizard: {
          payload: {
            selectedSubgenreResponse: { isDescriptionRequired: true },
          },
        },
      } as DeepPartial<RootState> as RootState)
    ).toBeTruthy();
    expect(
      selectIsDescriptionRequired({
        wizard: {
          payload: { subGenrePayload: { isDescriptionRequired: true } },
        },
      } as DeepPartial<RootState> as RootState)
    ).toBeTruthy();
    expect(
      selectIsDescriptionRequired({
        wizard: { payload: {} },
      } as DeepPartial<RootState> as RootState)
    ).toBeFalsy();
  });

  it("should return valid selectCurrentStep", () => {
    expect(
      selectCurrentStep({
        wizard: { currentStep: 5 },
      } as DeepPartial<RootState> as RootState)
    ).toEqual(5);
  });

  it("should return valid selectSubmissionStatus", () => {
    expect(
      selectSubmissionStatus({
        wizard: { status: "submitted" },
      } as DeepPartial<RootState> as RootState)
    ).toEqual("submitted");
  });

  it("should return valid selectPayload", () => {
    expect(
      selectPayload({
        wizard: { payload: { genreId: 5 } },
      } as DeepPartial<RootState> as RootState)
    ).toEqual({ genreId: 5 });
  });

  it("should return valid selectSubgenrePayload", () => {
    expect(
      selectSubgenrePayload({
        wizard: { payload: { subGenrePayload: { name: "name" } } },
      } as DeepPartial<RootState> as RootState)
    ).toEqual({ name: "name" });
  });

  it("should return valid selectBookInformationPayload", () => {
    expect(
      selectBookInformationPayload({
        wizard: { payload: { informationPayload: { title: "title" } } },
      } as DeepPartial<RootState> as RootState)
    ).toEqual({ title: "title" });
  });

  it("should return valid selectErrors", () => {
    expect(
      selectErrors({
        wizard: { errors: "some error" },
      } as DeepPartial<RootState> as RootState)
    ).toEqual("some error");
  });

  it("should return valid selectIsNewSubGenre", () => {
    expect(
      selectIsNewSubGenre({
        wizard: { payload: { subGenrePayload: {} } },
      } as DeepPartial<RootState> as RootState)
    ).toBeTruthy();
    expect(
      selectIsNewSubGenre({
        wizard: { payload: { selectedSubgenreResponse: {} } },
      } as DeepPartial<RootState> as RootState)
    ).toBeFalsy();
  });

  it("should set valid status on submitBookAsync.pending", () => {
    expect(wizardReducer(initialState, submitBookAsync.pending).status).toEqual('submitting');
  });

  it("should set valid status on submitBookAsync.rejected", () => {
    expect(wizardReducer(initialState, submitBookAsync.rejected).status).toEqual('idle');
  });

  it("should set valid status on submitBookAsync.rejected", () => {
    expect(wizardReducer(initialState, submitBookAsync.fulfilled).status).toEqual('submitted');
  });
});

//TODO: separate thunks into a new file and so their tests

jest.mock("./wizardAPI", () => {
  return {
    __esModule: true,
    submit: jest.fn((payload) => ({ id: 5, ...payload })),
  };
});

describe("Wizard slice - Submit thunk", () => {
  let dispatch: Dispatch<any>;

  afterAll(() => {
    jest.unmock("./wizardAPI");
  });

  beforeEach(() => {
    dispatch = jest.fn();
  });

  it("calls submit on no errors", async () => {
    let getState: () => RootState = jest.fn(
      () =>
        ({
          wizard: {
            payload: {
              genreId: 5,
            },
            errors: null,
          },
        } as DeepPartial<RootState> as RootState)
    );
    const action = await submitBookAsync()(dispatch, getState, undefined);
    expect(submit).toBeCalled();
  });

  it("doesn't call submit on no errors", async () => {
    let getState: () => RootState = jest.fn(
      () =>
        ({
          wizard: {
            payload: {
              genreId: 5,
            },
            errors: "error",
          },
        } as DeepPartial<RootState> as RootState)
    );
    const action = await submitBookAsync()(dispatch, getState, undefined);
    expect(submit).not.toBeCalled();
  });
});
