import styles from './Checkbox.module.css'

export type CheckboxProps = {
  checked: boolean;
  text: string;
}

export function Stepper(props: CheckboxProps) {
  
  return <div className={`${styles.wrapper} ${props.checked ? styles.checked : ''}`}>
    {props.text}
  </div>;
}