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
    const optionsWithUniqueKeys = props.options.map((opt, idx) => ({
      option: opt,
      fakeValue: (idx + 1).toString(),
    }));
    const onSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
      const value = event.target.value;
      if (value === helperText) props.onSelect(undefined);
      else
        props.onSelect(
          optionsWithUniqueKeys.find((opt) => opt.fakeValue === value)!.option
            .value
        );
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
          {optionsWithUniqueKeys.map((opt) => (
            <option value={opt.fakeValue} key={opt.fakeValue}>
              {opt.option.label}
            </option>
          ))}
        </select>
        {props.error && <span>{props.error}</span>}
      </div>
    );
  }
);
