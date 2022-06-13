import { render } from "@testing-library/react";
import { StatusHandler } from "./StatusHandler";

describe("StatusHandler", () => {
  test("renders", () => {
    const { getByText } = render(
      <StatusHandler status="idle">test</StatusHandler>
    );

    expect(getByText("test")).toBeInTheDocument();
  });

  test("renders correct loading state", () => {
    const { getByText, queryByText } = render(
      <StatusHandler status="loading">test</StatusHandler>
    );

    expect(getByText("Loading...")).toBeInTheDocument();
    expect(queryByText("test")).not.toBeInTheDocument();
  });

  test("renders correct failed state", () => {
    const { getByText, queryByText } = render(
      <StatusHandler status="failed">test</StatusHandler>
    );

    expect(getByText("Failed to load data.")).toBeInTheDocument();
    expect(queryByText("test")).not.toBeInTheDocument();
  });
});
