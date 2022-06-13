import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { Input } from "../../../../components/input/Input";
import RichEditor from "../../../../components/richEditor/RichEditor";
import { Select } from "../../../../components/select/Select";
import { Error } from "../../domain/validation";
import {
  BookPayloadInformation,
  selectBookInformationPayload,
  setBookInformationPayload,
} from "../../wizardSlice";
import styles from "./BookInformation.module.css";

export type BookInformationProps = {
  errors: Error<Partial<BookPayloadInformation>> | null;
};

export function BookInformation(props: BookInformationProps) {
  const payload = useAppSelector(selectBookInformationPayload);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.wrapper}>
      <Input
        className={styles.colSpan3}
        label="Book title"
        placeholder="Book title"
        value={payload.title}
        onChange={(value) =>
          dispatch(setBookInformationPayload({ title: value }))
        }
        type="text"
        error={props.errors?.title}
      />
      <Select
        className={styles.colSpan3}
        label="Author"
        placeholder="Author"
        value={payload.authorId}
        onSelect={(value) =>
          dispatch(setBookInformationPayload({ authorId: value }))
        }
        options={[
          { label: "Amgad Serry", value: 1 },
          { label: "Marija Nikolic", value: 2 },
        ]}
      />
      <Input
        className={styles.colSpan3}
        label="ISBN"
        placeholder="ISBN"
        value={payload.isbn}
        onChange={(value) =>
          dispatch(setBookInformationPayload({ isbn: value }))
        }
        type="text"
      />
      <Select
        className={styles.colSpan3}
        label="Publisher"
        placeholder="Publisher"
        value={payload.publisherId}
        onSelect={(value) =>
          dispatch(setBookInformationPayload({ publisherId: value }))
        }
        options={[
          { label: "Amgad Serry", value: 1 },
          { label: "Marija Nikolic", value: 2 },
        ]}
      />
      <Input
        className={styles.col1}
        label="Date published"
        placeholder="Date published"
        value={payload.datePublished}
        onChange={(value) =>
          dispatch(setBookInformationPayload({ datePublished: value }))
        }
        type="date"
      />
      <Input
        className={styles.col1}
        label="Number of pages"
        placeholder="Number of pages"
        value={payload.numberOfPages}
        onChange={(value) =>
          dispatch(setBookInformationPayload({ numberOfPages: value }))
        }
        type="number"
      />
      <Select
        className={styles.col1}
        label="Format"
        placeholder="Format"
        value={payload.format}
        onSelect={(value) =>
          dispatch(setBookInformationPayload({ format: value }))
        }
        options={[
          { label: "EPub", value: "EPub" },
          { label: "PDF", value: "PDF" },
        ]}
      />
      <Input
        className={styles.col1}
        label="Edition"
        placeholder="Edition"
        value={payload.edition}
        onChange={(value) =>
          dispatch(setBookInformationPayload({ edition: value }))
        }
        type="number"
      />
      <Select
        label="Edition Language "
        placeholder="Format Language"
        value={payload.editionLanguage}
        onSelect={(value) =>
          dispatch(setBookInformationPayload({ editionLanguage: value }))
        }
        options={[
          { label: "English", value: "en" },
          { label: "Arabic", value: "ar" },
        ]}
      />
      <div className={styles.colSpan3}>
        <RichEditor
          value={payload.description!}
          error={props.errors?.description}
          onChange={(value) =>
            dispatch(setBookInformationPayload({ description: value }))
          }
        />
      </div>
    </div>
  );
}
