import { h, render } from "./core/vdom";

type Msgs = "INCREMENT" | "DECREMENT";
type DispatchType = (action: Msgs) => void;

export const initModel = 0;

export function view(dispatch: DispatchType, model: number) {
  return h(
    "div",
    { className: "heading" },
    ...[
      h(
        "button",
        { className: "increase-class", onclick: () => dispatch("INCREMENT") },
        "+"
      ),
      h(
        "button",
        { className: "decrease-class", onclick: () => dispatch("DECREMENT") },
        "-"
      ),
      h("div", { className: "some" }, model.toString()),
    ]
  );
}

export function update(msg: Msgs, model: number): number {
  switch (msg) {
    case "INCREMENT":
      return model + 1;
    case "DECREMENT":
      return model - 1;
  }
}

export function simpleCounter(
  initModel: number,
  update: (msg: Msgs, model: number) => number,
  view: (dispatch: DispatchType, model: number) => any,
  node: HTMLElement | null
) {
  let model = initModel;
  let currentView = render(view(dispatch, model));
  node?.appendChild(currentView);

  function dispatch(msg: Msgs) {
    model = update(msg, model);
    const updatedView = render(view(dispatch, model));
    node?.replaceChild(updatedView, currentView);
    currentView = updatedView;
  }
}
