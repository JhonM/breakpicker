import { h } from "../../core/vdom";
import type { Msgs } from "../../types";

type DispatchType = (action: Msgs) => void;

export default function view(dispatch: DispatchType, model: number) {
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
      h("div", {}, model.toString()),
      h("pre", {}, JSON.stringify(model, null, 2)),
    ]
  );
}
