import styles from './Checkbox.module.css'

export type CheckboxProps = {
  checked: boolean;
  text: string;
  onClick: () => void
}

export function Checkbox(props: CheckboxProps) {
  
  return <div onClick={props.onClick} className={`${styles.checkbox} ${props.checked ? styles.checked : ''}`}>
    {props.text}
  </div>;
}