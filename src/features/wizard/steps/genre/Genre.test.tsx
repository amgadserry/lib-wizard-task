import { configureStore, DeepPartial } from "@reduxjs/toolkit";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { Genre } from "./Genre";
import genreReducer from "./genreSlice";
import { RootState } from "../../../../app/store";

const genreData = [
  {
    id: 1,
    name: "Genre 1",
  },
  {
    id: 2,
    name: "Genre 2",
  },
];

describe("Genre", () => {
  test("renders", () => {
    const store = configureStore({
      reducer: {
        genres: genreReducer,
      },
      preloadedState: {
        genres: {
          status: "idle",
          data: genreData,
        },
      } as DeepPartial<RootState> as RootState,
    });
    const { getByText } = render(
      <Provider store={store}>
        <Genre onChange={() => {}} value={1} error={null} />
      </Provider>
    );

    expect(getByText("Genre 1")).toBeInTheDocument();
    expect(getByText("Genre 2")).toBeInTheDocument();
  });

  test("renders loading", () => {
    const store = configureStore({
      reducer: {
        genres: genreReducer,
      },
      preloadedState: {
        genres: {
          status: "loading",
          data: genreData,
        },
      } as DeepPartial<RootState> as RootState,
    });
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <Genre onChange={() => {}} value={1} error={null} />
      </Provider>
    );

    expect(getByText("Loading...")).toBeInTheDocument();
    expect(queryByText("Genre 2")).not.toBeInTheDocument();
  });

  test("renders error", () => {
    const store = configureStore({
      reducer: {
        genres: genreReducer,
      },
      preloadedState: {
        genres: {
          status: "idle",
          data: genreData,
        },
      } as DeepPartial<RootState> as RootState,
    });
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <Genre onChange={() => {}} value={1} error={"error"} />
      </Provider>
    );

    expect(getByText("error")).toBeInTheDocument();
  });

  test("calls onChange", () => {
    const store = configureStore({
      reducer: {
        genres: genreReducer,
      },
      preloadedState: {
        genres: {
          status: "idle",
          data: genreData,
        },
      } as DeepPartial<RootState> as RootState,
    });

    const onChange = jest.fn();

    const { getByText } = render(
      <Provider store={store}>
        <Genre onChange={onChange} value={1} error={null} />
      </Provider>
    );

    fireEvent.click(getByText("Genre 2"));

    expect(onChange).toBeCalledWith(2);
  });
});
