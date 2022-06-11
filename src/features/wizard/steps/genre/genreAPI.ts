import { data } from "../../../../dummy-data";

export function fetchGenres() {
  return new Promise<{ data: Exclude<typeof data.genres, "subgenres"> }>(
    (resolve) => setTimeout(() => resolve({ data: data.genres }), 3000)
  );
}
