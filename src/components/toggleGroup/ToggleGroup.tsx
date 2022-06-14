import { Toggle } from "../toggle/Toggle";
import styles from "./ToggleGroup.module.css";

type ToggleGroupProps<T> = {
  label?: string;
  placeholder?: string;
  error?: string | null;
  className?: string;
  onChange: (value: T) => void;
  value: T;
  options: { label: string; value: T }[];
};

export function ToggleGroup(props: ToggleGroupProps<any>) {
  return (
    <div className={`${styles.wrapper} ${props.className}`}>
      <div className={styles.grid}>
        {props.options.map((opt) => (
          <Toggle
            checked={props.value === opt.value}
            text={opt.label}
            key={opt.label}
            onClick={() => props.onChange(opt.value)}
          />
        ))}
      </div>
      {props.error && <span className={styles.error}>{props.error}</span>}
    </div>
  );
}
