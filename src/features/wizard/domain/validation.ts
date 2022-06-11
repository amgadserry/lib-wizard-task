import { BookPayload, BookPayloadInformation } from "../wizardSlice";

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

export function validateInformationPayload(
  payload: BookPayloadInformation,
  isDescriptionRequired: boolean
): Error<Partial<BookPayloadInformation>> {
  return {
    description:
      isDescriptionRequired && (payload.description?.trim()?.length ?? 0) === 0
        ? "Please enter description"
        : null,
    title: _validateStringNotEmpty(payload.title) ? null : "Please enter title",
  };
}

export function isValidBookPayload(
  book: BookPayload,
  isDescriptionRequired: boolean
): boolean {
  return (
    validateGenre(book) === null &&
    validateSubGenre(book) === null &&
    (() => {
      const errors = validateInformationPayload(
        book.informationPayload,
        isDescriptionRequired
      );
      return Object.keys(errors).every(
        (key) => errors[key as keyof typeof errors] === null
      );
    })()
  );
}
