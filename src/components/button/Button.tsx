import { PropsWithChildren } from "react";
import styles from "./Button.module.css";

export type ButtonProps = {
  onClick: () => void;
  type?: "negative" | "action" | "default";
  disabled?: boolean;
};

export function Button(props: PropsWithChildren<ButtonProps>) {
  return (
    <button
      disabled={props.disabled}
      className={`${styles.common} ${styles[props.type!]} ${
        props.disabled ? styles.disabled : ""
      }`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

Button.defaultProps = {
  type: "default",
  disabled: false,
};
