/**
 * @jest-environment jsdom
 */
import { screen } from "@testing-library/dom";
import { h, createElement } from "../";
import { changed, setProps, setProp, setBooleanProp } from "../vdom";

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

describe("internal functions", () => {
  test("changed function", () => {
    const node1 = h("div", { id: "one" }, "Node 1");
    const node2 = h("button", { id: "two" }, "Node 2");

    expect(changed(node1, node1)).toEqual(false);
    expect(changed(node1, node2)).toEqual(true);
    expect(changed(createElement("div"), node1)).toEqual(true);
  });

  test("setProps", () => {
    const props = {
      id: "foo",
      className: "some-classname",
      title: "some title",
    };
    const anchor = createElement("a") as HTMLAnchorElement;
    setProps(anchor, props);

    expect(anchor.id).toBe("foo");
    expect(anchor.title).toBe("some title");
    expect(anchor.className).toBe("some-classname");
  });

  test("setProp with classname", () => {
    const target = createElement("div") as HTMLElement;
    setProp(target, "className", "a-classname");
    expect(target.className).toBe("a-classname");
  });

  test("setProp with a data-title", () => {
    const target = createElement("div") as HTMLElement;
    setProp(target, "id", "data-title");
    expect(target.id).toBe("data-title");
  });

  test("setProp with boolean", () => {
    const target = createElement("div") as HTMLElement;
    setProp(target, "boolean", "true");
    expect(target.attributes.item(0)?.name).toEqual("boolean");
    expect(target.attributes.item(0)?.value).toEqual("true");
  });

  test("setBooleanProp on true", () => {
    const target = createElement("div") as HTMLElement;
    setBooleanProp(target, "boolean", "true");
    expect(target.attributes.item(0)?.name).toEqual("boolean");
    expect(target.attributes.item(0)?.value).toEqual("true");
  });

  test("setBooleanProp on false", () => {
    const target = createElement("div") as any; // use a better type or different kind of test
    setBooleanProp(target, "boolean", false);
    expect(target.boolean).toEqual(false);
  });
});
