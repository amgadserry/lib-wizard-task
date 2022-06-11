import styles from './Loading.module.css';

export type LoadingProps = {
  text: string;
}

export function Loading(props: LoadingProps) {
  return <div className={styles.wrapper}>{props.text}</div>;
}

Loading.defaultProps = {
  text: 'Loading...'
}