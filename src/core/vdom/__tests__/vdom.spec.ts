/**
 * @jest-environment jsdom
 */
import { screen } from "@testing-library/dom";
import { h, createElement } from "../";

describe("h function", () => {
  test("it renders the h function with required arguments", () => {
    const hyper = h("div", { id: "foo" });
    expect(hyper).toEqual({ type: "div", props: { id: "foo" }, children: [] });
  });

  test("it renders h function with all arguments", () => {
    const hyper = h(
      "button",
      { className: "some-classname" },
      "Hello!!",
      "How are you",
      { type: "span" }
    );
    const response = {
      type: "button",
      props: { className: "some-classname" },
      children: ["Hello!!", "How are you", { type: "span" }],
    };

    expect(hyper).toEqual(response);
  });
});

describe("createElement", () => {
  test("it creates a div element based on string", () => {
    const element = createElement("div");
    const resultDiv = document.createElement("div");

    expect(element).toEqual(resultDiv);
  });

  test("it should create a text node", () => {
    const node = h("div", { id: "foo" }, "Hello");
    const textNode = createElement(node);

    expect(textNode.nodeType).toBe(3);
  });
});
