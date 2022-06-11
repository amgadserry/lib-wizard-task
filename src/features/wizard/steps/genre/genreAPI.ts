import { data } from "../../../../dummy-data";

export type GenreResponse = Omit<typeof data.genres[0], "subgenres">[];

export function fetchGenres() {
  return new Promise<{ data: GenreResponse }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: data.genres.map((g) => ({
            id: g.id,
            name: g.name,
          })),
        }),
      3000
    )
  );
}
