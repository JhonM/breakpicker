/**
 * @jest-environment jsdom
 */
import { h, changed, render, setProps, setProp, setBooleanProp } from "../vdom";

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

  test("it renders nested functions as children of h function", () => {
    const multipleHypers = [
      h("div", { className: "some-classname" }, "Title in div"),
      h("div", { className: "some-other-classname" }, "Some other title"),
    ];
    const hyper = h(
      "div",
      { className: "some-classname" },
      "Title in div",
      ...multipleHypers
    );
    const response = {
      type: "div",
      props: { className: "some-classname" },
      children: [
        "Title in div",
        {
          children: ["Title in div"],
          props: { className: "some-classname" },
          type: "div",
        },
        {
          children: ["Some other title"],
          props: { className: "some-other-classname" },
          type: "div",
        },
      ],
    };

    expect(hyper).toEqual(response);
  });
});

describe("render", () => {
  test("it creates a div element based on string", () => {
    const element = render("div");
    const resultDiv = document.createTextNode("div");

    expect(element).toEqual(resultDiv);
  });

  test("it should create a text node", () => {
    const node = h("div", { id: "foo" }, "Hello");
    const textNode = render(node);

    expect(textNode?.nodeType).toBe(1);
  });
});

describe("Update element", () => {
  test("it update", () => {
    const node = h(
      "div",
      { id: "id-name" },
      h("button", { className: "button" }, "Button text")
    );

    render(node);
  });
});

describe("internal functions", () => {
  test("changed function", () => {
    const node1 = h("div", { id: "one" }, "Node 1");
    const node2 = h("button", { id: "two" }, "Node 2");

    expect(changed(node1, node1)).toEqual(false);
    expect(changed(node1, node2)).toEqual(true);
    expect(changed(render("div"), node1)).toEqual(true);
  });

  test("setProps", () => {
    const props = {
      id: "foo",
      className: "some-classname",
      title: "some title",
    };
    const anchor = document.createElement("a");
    setProps(anchor, props);

    expect(anchor.id).toBe("foo");
    expect(anchor.title).toBe("some title");
    expect(anchor.className).toBe("some-classname");
  });

  test("setProp with classname", () => {
    const target = document.createElement("div");
    setProp({ target, name: "className", value: "a-classname" });
    expect(target.className).toBe("a-classname");
  });

  test("setProp with a data-title", () => {
    const target = document.createElement("div");
    setProp({ target, name: "id", value: "data-title" });
    expect(target.id).toBe("data-title");
  });

  test("setProp with boolean", () => {
    const target = document.createElement("div");
    setProp({ target, name: "boolean", value: "true" });
    expect(target.attributes.item(0)?.name).toEqual("boolean");
    expect(target.attributes.item(0)?.value).toEqual("true");
  });

  test("setBooleanProp on true", () => {
    const target = document.createElement("div");
    setBooleanProp({ target, name: "boolean", value: "true" });
    expect(target.attributes.item(0)?.name).toEqual("boolean");
    expect(target.attributes.item(0)?.value).toEqual("true");
  });

  test("setBooleanProp on false", () => {
    const target = document.createElement("div") as any; // use a better type or different kind of test
    setBooleanProp({ target, name: "boolean", value: "" });
    expect(target.boolean).toEqual(false);
  });
});
