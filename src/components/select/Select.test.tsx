import { fireEvent, render } from "@testing-library/react";
import { Select } from "./Select";

describe("Select", () => {
  test("renders", () => {
    const { getByRole, getByText } = render(
      <Select
        onSelect={() => {}}
        value={undefined}
        options={[
          { label: "text", value: "text" },
          { label: "text2", value: "text2" },
        ]}
      ></Select>
    );

    expect(getByRole("combobox")).toBeInTheDocument();
    expect(getByText("text")).toBeInTheDocument();
    expect(getByText("text2")).toBeInTheDocument();
    expect(getByRole("combobox")).toHaveValue(undefined);
  });

  test("renders label", () => {
    const { getByText } = render(
      <Select
        label="test"
        onSelect={() => {}}
        value={undefined}
        options={[
          { label: "text", value: "text" },
          { label: "text2", value: "text2" },
        ]}
      ></Select>
    );

    expect(getByText("test")).toBeInTheDocument();
  });

  test("renders error", () => {
    const { getByText } = render(
      <Select
        error="test"
        onSelect={() => {}}
        value={undefined}
        options={[
          { label: "text", value: "text" },
          { label: "text2", value: "text2" },
        ]}
      ></Select>
    );

    expect(getByText("test")).toBeInTheDocument();
  });

  test("calls onSelect with valid value", () => {
    const mockFn = jest.fn();
    const { getByRole } = render(
      <Select
        onSelect={mockFn}
        value={undefined}
        options={[
          { label: "text", value: "text" },
          { label: "text2", value: "text2" },
        ]}
      ></Select>
    );

    fireEvent.change(getByRole("combobox"), {
      target: { value: "2" },
    });

    expect(mockFn).toBeCalledWith("text2");
  });

  test("can reset", () => {
    const mockFn = jest.fn();
    const { getByRole } = render(
      <Select
        onSelect={mockFn}
        value={undefined}
        options={[
          { label: "text", value: "text" },
          { label: "text2", value: "text2" },
        ]}
      ></Select>
    );

    fireEvent.change(getByRole("combobox"), {
      target: { value: "Please select one of the options" },
    });

    expect(mockFn).toBeCalledWith(undefined);
  });
});
