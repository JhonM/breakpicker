import { template } from "../template";

test("it renders", () => {
  const fn = template("A rendered string with {{value}}!");
  expect(fn({ value: "test data" })).toEqual(
    "A rendered string with test data!"
  );
});
