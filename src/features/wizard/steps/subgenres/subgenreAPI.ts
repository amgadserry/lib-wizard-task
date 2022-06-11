import { data } from "../../../../dummy-data";

export type SubgenreResponse = typeof data.genres[0]["subgenres"];

export function fetchSubgenres(genreId: number) {
  return new Promise<{ data: SubgenreResponse }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: data.genres.find((g) => g.id === genreId)!.subgenres,
        }),
      1000
    )
  );
}
