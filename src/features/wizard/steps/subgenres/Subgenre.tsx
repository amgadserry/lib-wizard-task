import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { StatusHandler } from "../../../../components/status/StatusHandler";
import { fetchSubgenresAsync, selectSubgenresState } from "./subgenresSlice";
import { SubgenreResponse } from "../../../../dummy-data";
import { ToggleGroup } from "../../../../components/toggleGroup/ToggleGroup";

export type GenreProps = {
  onChange: (response: SubgenreResponse) => void;
  onAddNewSelected: () => void;
  error: string | null;
  value?: SubgenreResponse;
  isNewSelected: boolean;
};

export function Subgenre(props: GenreProps) {
  const state = useAppSelector(selectSubgenresState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSubgenresAsync());
  }, []);

  const onChange = (value: SubgenreResponse | null) => {
    if (value === null) props.onAddNewSelected();
    else props.onChange(value);
  };

  return (
    <StatusHandler status={state.status}>
      <ToggleGroup
        onChange={onChange}
        options={[
          ...state.data.map((g) => ({ label: g.name, value: g })),
          { label: "Add new", value: null },
        ]}
        value={props.isNewSelected ? null : props.value}
        error={props.error}
      />
    </StatusHandler>
  );
}
