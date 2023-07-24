import { h } from "@jhonm/blanc-vdom";
import type { Model, DispatchType } from "../../types";
import { CalendarView } from "./views";
import { containerClass } from "../../styles/styles.css";

export default function view(dispatch: DispatchType, model: Model) {
  return h(
    "div",
    { className: containerClass },
    ...[
      CalendarView(dispatch, model),
      h("pre", {}, JSON.stringify(model, null, 2)),
    ]
  );
}
