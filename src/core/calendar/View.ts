import { h } from "@jhonm/blanc-vdom";
import type { Model, DispatchType, Options } from "../../types";
import { CalendarView } from "./views";

export default function view(
  dispatch: DispatchType,
  model: Model,
  options: Options
) {
  return h(
    "div",
    {},
    ...[
      CalendarView(dispatch, model, options),
      h("pre", {}, JSON.stringify(model, null, 2)),
    ]
  );
  //     h("div", { className: "some-pname" }, model.currentDate.toString()),
}
