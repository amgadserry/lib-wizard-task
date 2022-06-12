import styles from "./Toggle.module.css";

export type ToggleProps = {
  checked: boolean;
  text: string;
  onClick: () => void;
};

export function Toggle(props: ToggleProps) {
  return (
    <div
      onClick={props.onClick}
      className={`${styles.toggle} ${props.checked ? styles.checked : ""}`}
    >
      {props.text}
    </div>
  );
}
