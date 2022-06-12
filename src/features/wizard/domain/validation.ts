import {
  BookPayload,
  BookPayloadInformation,
  SubgenrePayload,
} from "../wizardSlice";

export type Error<T> = {
  [Property in keyof Partial<T>]: string | null;
};

function _validateStringNotEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export function validateGenre(payload: Partial<BookPayload>): string | null {
  if (!!payload.genreId) {
    return null;
  } else {
    return "Please select genre";
  }
}

export function validateSubGenre(payload: Partial<BookPayload>): string | null {
  if (!!payload.subGenreId || !!payload.subGenrePayload) {
    return null;
  } else {
    return "Please select sub genre";
  }
}

export function validateSubGenrePayload(
  payload: Partial<SubgenrePayload>
): Error<Partial<SubgenrePayload>> {
  return {
    name: _validateStringNotEmpty(payload.name ?? "")
      ? null
      : "Please enter name",
  };
}

export function validateInformationPayload(
  payload: BookPayloadInformation,
  isDescriptionRequired: boolean
): Error<Partial<BookPayloadInformation>> {
  return {
    description:
      isDescriptionRequired &&
      _validateStringNotEmpty(payload.description ?? "")
        ? "Please enter description"
        : null,
    title: _validateStringNotEmpty(payload.title) ? null : "Please enter title",
  };
}

export function errorPayloadContainsNoValidationErrors(
  error: Error<any>
): boolean {
  console.log(Object.keys(error).every((key) => error[key] === null));
  return Object.keys(error).every((key) => error[key] === null);
}

export function isValidBookPayload(
  book: BookPayload,
  isDescriptionRequired: boolean
): boolean {
  return (
    validateGenre(book) === null &&
    validateSubGenre(book) === null &&
    (!book.subGenrePayload ||
      errorPayloadContainsNoValidationErrors(
        validateSubGenrePayload(book.subGenrePayload)
      )) &&
    errorPayloadContainsNoValidationErrors(
      validateInformationPayload(book.informationPayload, isDescriptionRequired)
    )
  );
}
