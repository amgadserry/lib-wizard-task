import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import { debug } from "console";
import { Input } from "./Input";

describe("Input", () => {
  test("renders", () => {
    const { getByRole } = render(
      <Input type="text" onChange={() => {}} value="text"></Input>
    );

    expect(getByRole("textbox")).toBeInTheDocument();
    expect(getByRole("textbox")).toHaveValue("text");
  });

  test("renders label", () => {
    const { getByText } = render(
      <Input type="text" onChange={() => {}} value="text" label="text"></Input>
    );

    expect(getByText("text")).toBeInTheDocument();
  });

  test("renders error", () => {
    const { getByText } = render(
      <Input type="text" onChange={() => {}} value="text" error="text"></Input>
    );

    expect(getByText("text")).toBeInTheDocument();
  });

  test("renders valid number", () => {
    const { getByPlaceholderText, rerender } = render(
      <Input
        type="number"
        onChange={() => {}}
        value={5}
        placeholder="id"
      ></Input>
    );

    expect(getByPlaceholderText("id")).toBeInTheDocument();
    expect(getByPlaceholderText("id")).toHaveValue(5);
  });

  test("renders valid date", () => {
    const date = new Date(2002, 0, 1);
    const { getByPlaceholderText, rerender } = render(
      <Input
        type="date"
        onChange={() => {}}
        value={date.toISOString()}
        placeholder="id"
      ></Input>
    );

    expect(getByPlaceholderText("id")).toBeInTheDocument();
    expect(getByPlaceholderText("id")).toHaveValue("2002-01-01");
  });

  test("renders current date with no value", () => {
    const date = new Date();
    const { getByPlaceholderText } = render(
      <Input type="date" onChange={() => {}} placeholder="id"></Input>
    );

    expect(getByPlaceholderText("id")).toBeInTheDocument();
    expect(getByPlaceholderText("id")).toHaveValue("");
  });

  test("call onChange (text) when typing", () => {
    const mockFn = jest.fn();
    const { getByPlaceholderText } = render(
      <Input type="text" onChange={mockFn} value={"f"} placeholder="id"></Input>
    );

    fireEvent.change(getByPlaceholderText("id"), { target: { value: "A" } });
    expect(mockFn).toBeCalledWith("A");
  });

  test("call onChange (number) when typing", () => {
    const mockFn = jest.fn();
    const { getByPlaceholderText } = render(
      <Input type="number" onChange={mockFn} value={5} placeholder="id"></Input>
    );

    fireEvent.change(getByPlaceholderText("id"), { target: { value: "55" } });
    expect(mockFn).toBeCalledWith(55);
  });

  test("call onChange (number) with 0 if no value", () => {
    const mockFn = jest.fn();
    const { getByPlaceholderText } = render(
      <Input type="number" onChange={mockFn} value={5} placeholder="id"></Input>
    );

    fireEvent.change(getByPlaceholderText("id"), { target: { value: "" } });
    expect(mockFn).toBeCalledWith(0);
  });

  test("call onChange (date)", () => {
    const mockFn = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        type="date"
        onChange={mockFn}
        value={new Date().toISOString()}
        placeholder="id"
      ></Input>
    );

    fireEvent.change(getByPlaceholderText("id"), {
      target: { value: "2020-01-01" },
    });
    expect(mockFn).toBeCalledWith(
      new Date(
        new Date("2020-01-01").getTime() +
          new Date("2020-01-01").getTimezoneOffset() * 60000
      ).toISOString()
    );
  });
});
