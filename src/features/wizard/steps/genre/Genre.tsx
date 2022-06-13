import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { StatusHandler } from "../../../../components/status/StatusHandler";
import { fetchGenresAsync, selectGenreState } from "./genreSlice";
import { ToggleGroup } from "../../../../components/toggleGroup/ToggleGroup";

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
      <ToggleGroup
        {...props}
        options={genresState.data.map((g) => ({ label: g.name, value: g.id }))}
      />
    </StatusHandler>
  );
}
