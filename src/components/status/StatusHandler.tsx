import { ReactNode } from "react";
import { Loading } from "../loading/Loading";
import styles from './StatusHandler.module.css'

export type StatusString = 'idle' | 'loading' | 'failed'

export type StatusHandlerProps = {
  status: StatusString;
  children: ReactNode;
}

export function StatusHandler(props: StatusHandlerProps) {
  if (props.status === 'loading') {
    return <Loading ></Loading>;
  } else if (props.status === 'failed') {
    return <div>
      <div className={styles.error}>Failed to load genres.</div>
    </div>
  } else {
    return <>{props.children}</>;
  }
}