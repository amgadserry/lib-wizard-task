import { render } from "@testing-library/react";
import { Loading } from "./Loading";

describe("Loading", () => {
  test("renders", () => {
    const { getByText } = render(<Loading />);

    expect(getByText("Loading...")).toBeInTheDocument();
  });

  test("renders correct text", () => {
    const { getByText } = render(<Loading text="test" />);

    expect(getByText("test")).toBeInTheDocument();
  });
});
