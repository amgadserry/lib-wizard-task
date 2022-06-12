import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { StatusHandler } from "../../../../components/status/StatusHandler";
import { fetchGenresAsync, selectGenreState } from "./genreSlice";
import styles from "./Genre.module.css";
import { Toggle } from "../../../../components/toggle/Toggle";

export type GenreProps = {
  onChange: (id: number) => void;
  error: string | null;
  value: number;
};

export function Genre(props: GenreProps) {
  const genresState = useAppSelector(selectGenreState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGenresAsync());
  }, []);

  return (
    <StatusHandler status={genresState.status}>
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          {genresState.data.map((g) => (
            <Toggle
              checked={props.value === g.id}
              text={g.name}
              key={g.id}
              onClick={() => props.onChange(g.id)}
            />
          ))}
        </div>
        {!!props.error && <div className={styles.error}>{props.error}</div>}
      </div>
    </StatusHandler>
  );
}
