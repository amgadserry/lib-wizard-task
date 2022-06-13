import { render } from "@testing-library/react";
import { Stepper } from "./Stepper";

describe("Stepper", () => {
  test("renders", () => {
    const { getByText } = render(
      <Stepper steps={["step1", "step2"]} currentStep={0} />
    );

    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("step1")).toBeInTheDocument();
    expect(getByText("step2")).toBeInTheDocument();
    expect(getByText("1")).toHaveClass("indicatorSelected");
  });

  test("handles empty steps", () => {
    const { getByText } = render(
      <Stepper steps={["step1", "step2", null]} currentStep={0} />
    );

    expect(getByText("...")).toBeInTheDocument();
  });
});
