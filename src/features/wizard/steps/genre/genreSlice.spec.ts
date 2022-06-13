import { DeepPartial } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { RootState } from "../../../../app/store";
import { fetchGenres } from "./genreAPI";
import genreReducer, {
  fetchGenresAsync,
  GenerSliceState,
  selectGenreState,
  selectGenreStatus,
} from "./genreSlice";

describe("Genre slice", () => {
  const initialState: GenerSliceState = {
    data: [],
    status: "idle",
  };
  it("should initialize with proper values", () => {
    expect(genreReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should set valid status on submitBookAsync.pending", () => {
    expect(genreReducer(initialState, fetchGenresAsync.pending).status).toEqual(
      "loading"
    );
  });

  it("should set valid status on submitBookAsync.rejected", () => {
    expect(
      genreReducer(initialState, fetchGenresAsync.rejected).status
    ).toEqual("failed");
  });

  it("should set valid status on submitBookAsync.rejected", () => {
    expect(
      genreReducer(
        initialState,
        fetchGenresAsync.fulfilled(
          [
            {
              id: 1,
              name: "Genre 1",
            },
          ],
          ""
        )
      )
    ).toEqual({
      status: "idle",
      data: [
        {
          id: 1,
          name: "Genre 1",
        },
      ],
    });
  });

  it("should return valid selectGenreState ", () => {
    expect(
      selectGenreState({
        genres: {
          status: "loading",
          data: [{ id: 1, name: "1" }],
        },
      } as DeepPartial<RootState> as RootState)
    ).toEqual({
      status: "loading",
      data: [{ id: 1, name: "1" }],
    });
  });

  it("should return valid selectGenreStatus", () => {
    expect(
      selectGenreStatus({
        genres: {
          status: "loading",
          data: [{ id: 1, name: "1" }],
        },
      } as DeepPartial<RootState> as RootState)
    ).toEqual("loading");
  });
});

const data = [
  {
    id: 1,
    name: "Genre 1",
  },
  {
    id: 2,
    name: "Genre 2",
  },
];

jest.mock("./genreAPI", () => {
  return {
    __esModule: true,
    fetchGenres: jest.fn(() => ({
      data,
    })),
  };
});

describe("Genre slice - Load thunk", () => {
  let dispatch: Dispatch<any>;

  afterAll(() => {
    jest.unmock("./genreAPI");
  });

  beforeEach(() => {
    dispatch = jest.fn();
  });

  it("calls api", async () => {
    await fetchGenresAsync()(
      dispatch,
      () => ({ genres: { status: "idle", data: [] } as GenerSliceState }),
      undefined
    );
    expect(fetchGenres).toBeCalled();
  });

  it("ignores on invalid data", async () => {
    await fetchGenresAsync()(
      dispatch,
      () => ({ genres: { status: "loading", data } as GenerSliceState }),
      undefined
    );
    expect(fetchGenres).not.toBeCalled();
  });
});
