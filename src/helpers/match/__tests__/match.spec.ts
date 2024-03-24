import { match } from "../match";

const EXAMPLE_TYPE = {
  ONE: "one",
  TWO: "two",
  THREE: "three",
};

type ExampleType =
  | "<h1>ONE</h1>"
  | "<h1>TWO</h1>"
  | "<h1>THREE</h1>"
  | "<h1>DEFAULT</h1>";

describe("match", () => {
  it("matches and should be composable", () => {
    const matchesWithNumberAsValue = match<number, number>(50)
      .on(
        (x) => x < 0,
        () => 0
      )
      .on(
        (x) => x >= 0 && x <= 1,
        () => 1
      )
      .otherwise((x) => x * 10);

    expect(matchesWithNumberAsValue).toBe(500);
  });

  it("matches with the example type", () => {
    const exampleType = "one";
    const matchesWithObjectAsValue = match<string, ExampleType>(exampleType)
      .on(
        (x) => x === EXAMPLE_TYPE.ONE,
        () => "<h1>ONE</h1>"
      )
      .on(
        (x) => x === EXAMPLE_TYPE.TWO,
        () => "<h1>TWO</h1>"
      )
      .on(
        (x) => x === EXAMPLE_TYPE.THREE,
        () => "<h1>THREE</h1>"
      )
      .otherwise(() => "<h1>DEFAULT</h1>");

    expect(matchesWithObjectAsValue).toBe("<h1>ONE</h1>");
  });

  it("matches with an invalid type and shows default", () => {
    const exampleType = "";
    const matchesWithObjectAsValue = match<string, ExampleType>(exampleType)
      .on(
        (x) => x === EXAMPLE_TYPE.ONE,
        () => "<h1>ONE</h1>"
      )
      .on(
        (x) => x === EXAMPLE_TYPE.TWO,
        () => "<h1>TWO</h1>"
      )
      .on(
        (x) => x === EXAMPLE_TYPE.THREE,
        () => "<h1>THREE</h1>"
      )
      .otherwise(() => "<h1>DEFAULT</h1>");

    expect(matchesWithObjectAsValue).toBe("<h1>DEFAULT</h1>");
  });
});
