import React, { ChangeEventHandler, useId } from "react";
import styles from "./Select.module.css";

type SelectProps<T> = {
  label?: string;
  placeholder?: string;
  error?: string | null;
  className?: string;
  onSelect: (value: T) => void;
  value: T;
  options: { label: string; value: T }[];
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps<any>>(
  (props, ref) => {
    const helperText = "Please select one of the options";
    const id = useId();
    const onSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
      const value = event.target.value;
      if (value !== helperText) props.onSelect(value);
      else props.onSelect(value);
    };

    return (
      <div className={`${styles.wrapper} ${props.className}`}>
        {!!props.label && <label htmlFor={id}>{props.label}</label>}
        <select
          ref={ref}
          placeholder={props.placeholder}
          id={id}
          onChange={onSelect}
          value={props.value}
        >
          <option>{helperText}</option>
          {props.options.map((opt) => (
            <option value={opt.value} key={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {props.error && <span>{props.error}</span>}
      </div>
    );
  }
);
