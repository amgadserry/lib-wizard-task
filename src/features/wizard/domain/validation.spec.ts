import {
  isValidBookPayload,
  validateGenre,
  validateInformationPayload,
  validateSubGenre,
  validateSubGenrePayload,
} from "./validation";

describe("Wizard validations", () => {
  it("should validate genre correctly", () => {
    expect(validateGenre({ genreId: 1 })).toBeNull();
    expect(validateGenre({})).not.toBeNull();
    expect(validateGenre({ genreId: 0 })).not.toBeNull();
  });

  it("should validate subgenre correctly", () => {
    expect(
      validateSubGenre({
        selectedSubgenreResponse: {
          id: 1,
          name: "",
          isDescriptionRequired: true,
        },
      })
    ).toBeNull();

    expect(
      validateSubGenre({
        subGenrePayload: {
          name: "",
          isDescriptionRequired: true,
        },
      })
    ).toBeNull();

    expect(validateSubGenre({})).not.toBeNull();
  });

  it("should validate subgenre payload correctly", () => {
    expect(
      validateSubGenrePayload({
        name: "some name",
        isDescriptionRequired: true,
      })
    ).toEqual({ name: null });

    expect(validateSubGenrePayload({ name: "" }).name).not.toBeNull();
    expect(validateSubGenrePayload({}).name).not.toBeNull();
  });

  it("should validate information payload correctly", () => {
    expect(
      validateInformationPayload(
        {
          title: "some title",
        },
        false
      )
    ).toEqual({ title: null, description: null });

    expect(
      validateInformationPayload(
        {
          title: "some title",
        },
        true
      ).description
    ).not.toBeNull();

    expect(
      validateInformationPayload(
        {
          title: "",
        },
        true
      ).description
    ).not.toBeNull();
  });

  it("should validate entire payload correctly", () => {
    expect(
      isValidBookPayload(
        {
          genreId: 1,
          subGenrePayload: { name: "some name", isDescriptionRequired: false },
          informationPayload: {
            title: "some title",
          },
        },
        false
      )
    ).toBeTruthy();

    expect(
      isValidBookPayload(
        {
          genreId: 1,
          informationPayload: {
            title: "some title",
          },
        },
        false
      )
    ).toBeFalsy();
  });
});
