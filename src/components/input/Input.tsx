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
        props.onChange(new Date(value).toISOString());
      } else if (props.type === "number") {
        if (value === "") {
          props.onChange(0);
        } else {
          props.onChange(Number.parseInt(value));
        }
      }
    };

    const getValue = () => {
      if (props.type === "date") {
        const date = props.value ? new Date(props.value) : new Date();
        return `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate()}`;
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
          value={getValue()}
        />
        {props.error && <span>{props.error}</span>}
      </div>
    );
  }
);
