import { data, SubgenreResponse } from "../../../../dummy-data";

export function fetchSubgenres(genreId: number) {
  return new Promise<{ data: SubgenreResponse[] }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: data.genres.find((g) => g.id === genreId)!.subgenres,
        }),
      1000
    )
  );
}
