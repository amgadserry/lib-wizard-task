import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { StatusHandler } from "../../../../components/status/StatusHandler";
import { fetchSubgenresAsync, selectSubgenresState } from "./subgenresSlice";
import styles from "./Subgenre.module.css";
import { Toggle } from "../../../../components/toggle/Toggle";

export type GenreProps = {
  onChange: (id: number) => void;
  onAddNewSelected: () => void;
  error: string | null;
  value?: number;
  isNewSelected: boolean;
};

export function Subgenre(props: GenreProps) {
  const state = useAppSelector(selectSubgenresState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSubgenresAsync());
  }, []);

  return (
    <StatusHandler status={state.status}>
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          {state.data.map((g) => (
            <Toggle
              checked={props.value === g.id}
              text={g.name}
              key={g.id}
              onClick={() => props.onChange(g.id)}
            />
          ))}
          <Toggle
            checked={props.isNewSelected}
            text="Add new"
            key={-1}
            onClick={() => props.onAddNewSelected()}
          />
        </div>
        {!!props.error && <div className={styles.error}>{props.error}</div>}
      </div>
    </StatusHandler>
  );
}
