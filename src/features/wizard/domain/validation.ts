import { BookPayload, BookPayloadInformation } from "../wizardSlice";

export type Error<T> = {
  [Property in keyof Partial<T>]: string | null;
};

function _validateStringNotEmpty(value: string): boolean {
  return value.trim().length > 0;
}

function _validateNumberGreaterThanZero(value: number): boolean {
  return value > 0;
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
    authorId: _validateNumberGreaterThanZero(payload.authorId)
      ? null
      : "Please select an author",
    description:
      isDescriptionRequired && (payload.description?.trim()?.length ?? 0) === 0
        ? "Please enter description"
        : null,
    edition: _validateNumberGreaterThanZero(payload.edition)
      ? null
      : "Edition must be greater than 0",
    editionLanguage: _validateStringNotEmpty(payload.editionLanguage)
      ? null
      : "Please enter edition language",
    format: _validateStringNotEmpty(payload.format)
      ? null
      : "Please enter format",
    isbn: _validateStringNotEmpty(payload.isbn) ? null : "Please enter isbn",
    numberOfPages: _validateNumberGreaterThanZero(payload.numberOfPages)
      ? null
      : "Number of pages must be greater than 0",
    title: _validateStringNotEmpty(payload.title) ? null : "Please enter title",
    publisherId: _validateNumberGreaterThanZero(payload.numberOfPages)
      ? null
      : "Please select publisher id",
  };
}
