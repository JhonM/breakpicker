import { h } from "@jhonm/blanc-vdom";
import type { Model, DispatchType } from "../../types";
import { CalendarView } from "./views";

export default function view(dispatch: DispatchType, model: Model) {
  return h(
    "div",
    {},
    ...[
      CalendarView(dispatch, model),
      h("pre", {}, JSON.stringify(model, null, 2)),
    ]
  );
}
