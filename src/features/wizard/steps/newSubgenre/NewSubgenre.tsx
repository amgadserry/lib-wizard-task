import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { Checkbox } from "../../../../components/checkbox/Checkbox";
import { Input } from "../../../../components/input/Input";
import { Error } from "../../domain/validation";
import {
  selectSubgenrePayload,
  setSubgenrePayload,
  SubgenrePayload,
} from "../../wizardSlice";
import styles from "./NewSubgenre.module.css";

export type NewSubgenreProps = {
  errors: Error<Partial<SubgenrePayload>> | null;
};

export function NewSubgenre(props: NewSubgenreProps) {
  const payload = useAppSelector(selectSubgenrePayload);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.wrapper}>
      <Input
        label="Name"
        type="text"
        placeholder="Subgenre name"
        value={payload!.name}
        error={props.errors?.name}
        onChange={(value) =>
          dispatch(
            setSubgenrePayload({
              name: value as string,
            })
          )
        }
      />

      <Checkbox
        label="Description is required for this subgenre"
        value={payload!.isDescriptionRequired}
        onChange={(value) =>
          dispatch(setSubgenrePayload({ isDescriptionRequired: value }))
        }
      />
    </div>
  );
}
