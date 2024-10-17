import { prefix, prefixedNames } from "../prefix_builder";

describe("Prefix Builder", () => {
  it("can build a className with a prefix", () => {
    const prefixBuilder = prefix.create();
    expect(prefixBuilder.add("class-one").build()).toBe("bp-class-one");
  });

  it("can build multiple classnames with passed in prefix", () => {
    const prefixBuilder = prefix.create();
    expect(
      prefixBuilder.add("class-one").add("class-two").add("class-three").build()
    ).toBe("bp-class-one bp-class-two bp-class-three");
  });

  it("prefix multiple words in string", () => {
    expect(prefixedNames("some-class other-class last-class")).toBe(
      "bp-some-class bp-other-class bp-last-class"
    );
  });
});
