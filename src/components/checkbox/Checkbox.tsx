import React, { ChangeEventHandler, useId } from "react";
import styles from "./Checkbox.module.css";

export type CheckboxProps = {
  label: string;
  onChange: (value: boolean) => void;
  value: boolean;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const id = useId();

    return (
      <div className={styles.wrapper}>
        <input
          ref={ref}
          id={id}
          type="checkbox"
          onChange={() => props.onChange(!props.value)}
          checked={props.value}
        />
        <label htmlFor={id}>{props.label}</label>
      </div>
    );
  }
);
