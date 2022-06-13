import { render } from "@testing-library/react";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  test("renders", () => {
    const { getByText, getByRole } = render(<Checkbox onChange={() => {}} label="Checkbox" value={false}></Checkbox>);

    expect(getByText("Checkbox")).toBeInTheDocument();
    expect(getByRole("checkbox")).not.toBeChecked()
  });


  test("renders truthful value", () => {
    const { getByRole } = render(<Checkbox onChange={() => {}} label="Checkbox" value={true}></Checkbox>);
    expect(getByRole("checkbox")).toBeChecked()
  });


  test("fires onChange", () => {
    const mockFn = jest.fn();
    const { getByRole } = render(
      <Checkbox onChange={mockFn} label="Checkbox" value={true}></Checkbox>
    );

    getByRole("checkbox").click();

    expect(mockFn).toBeCalledWith(false);
  });
});
