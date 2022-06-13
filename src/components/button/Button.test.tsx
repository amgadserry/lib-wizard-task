import { render } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  test("renders", () => {
    const { getByText } = render(<Button onClick={() => {}}>Text</Button>);

    expect(getByText("Text")).toBeInTheDocument();
  });

  test("renders correct class based on type", () => {
    const { getByText, rerender } = render(
      <Button onClick={() => {}}>Text</Button>
    );

    expect(getByText("Text").classList).toContain("default");

    rerender(
      <Button type="action" onClick={() => {}}>
        Text
      </Button>
    );
    expect(getByText("Text").classList).toContain("action");
  });

  test("fires onClick", () => {
    const mockFn = jest.fn();
    const { getByText } = render(<Button onClick={mockFn}>Text</Button>);

    getByText("Text").click();

    expect(mockFn).toBeCalled();
  });
});
