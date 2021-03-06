import React, { ChangeEventHandler, useId } from "react";
import styles from "./Input.module.css";

type InputBaseProps = {
  label?: string;
  placeholder?: string;
  error?: string | null;
  className?: string;
};

type TextDateInputProps = InputBaseProps & {
  type: "text" | "date";
  onChange: (value: string) => void;
  value?: string;
};

type NumberInputProps = InputBaseProps & {
  type: "number";
  onChange: (value: number) => void;
  value?: number;
};

export type InputProps = TextDateInputProps | NumberInputProps;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const id = useId();
    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      const value = event.target.value;
      if (props.type === "text") {
        props.onChange(value);
      } else if (props.type === "date") {
        const noneUtc = new Date(value);
        props.onChange(
          new Date(
            noneUtc.getTime() + noneUtc.getTimezoneOffset() * 60000
          ).toISOString()
        );
      } else if (props.type === "number") {
        if (value === "") {
          props.onChange(0);
        } else {
          props.onChange(Number.parseInt(value));
        }
      }
    };

    const getValue = () => {
      if (!props.value) return undefined;
      if (props.type === "date") {
        const date = new Date(props.value);
        return `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
      }
      return props.value;
    };

    return (
      <div className={`${styles.wrapper} ${props.className}`}>
        {!!props.label && <label htmlFor={id}>{props.label}</label>}
        <input
          ref={ref}
          placeholder={props.placeholder}
          id={id}
          type={props.type}
          onChange={onChange}
          value={getValue() ?? ""}
        />
        {props.error && <span>{props.error}</span>}
      </div>
    );
  }
);
