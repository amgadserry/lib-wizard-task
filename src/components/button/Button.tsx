import { PropsWithChildren } from 'react';
import styles from './Button.module.css'

export type ButtonProps = {
  onClick: () => void;
  type?: 'negative' | 'action' | 'default';
}

export function Button(props: PropsWithChildren<ButtonProps>) {
  return <button className={`${styles.common} ${styles[props.type!]}`} onClick={props.onClick}>{props.children}</button>
}

Button.defaultProps = {
  type: 'default'
}