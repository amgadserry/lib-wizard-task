import { fireEvent, render } from "@testing-library/react";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  test("renders", () => {
    const { getByText } = render(
      <Toggle text="Option 1" onClick={() => {}} checked={false} />
    );

    expect(getByText("Option 1")).toBeInTheDocument();
    expect(getByText("Option 1")).not.toHaveClass("checked");
  });

  test("handles truthful checked state", () => {
    const { getByText } = render(
      <Toggle text="Option 1" onClick={() => {}} checked={true} />
    );

    expect(getByText("Option 1")).toBeInTheDocument();
    expect(getByText("Option 1")).toHaveClass("checked");
  });

  test("handles onClick", () => {
    const mockFn = jest.fn();
    const { getByText } = render(
      <Toggle text="Option 1" onClick={mockFn} checked={true} />
    );

    fireEvent.click(getByText("Option 1"));

    expect(mockFn).toBeCalled();
  });
});
