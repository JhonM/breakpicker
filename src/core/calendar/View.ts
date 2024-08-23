import { h } from "@jhonm/blanc-vdom";
import type { Model, DispatchType } from "../../types";
import { CalendarView, AddSlotFormView, ToastView } from "./views";
import { containerClass } from "../../styles/styles.css";
import { undoAddLatestSlotMsg } from "./update/updateUndoLatestSlot";
import "./views/dialog-off-canvas";

function undoView(dispatch: DispatchType, title: string) {
  return h(
    "button",
    { onclick: () => dispatch(undoAddLatestSlotMsg()) },
    title
  );
}

export default function view(dispatch: DispatchType, model: Model) {
  return h(
    "div",
    { className: containerClass },
    ...[
      CalendarView(dispatch, model),
      ToastView(dispatch, model, undoView(dispatch, "Undo action")),
      h(
        "dialog-off-canvas",
        { heading: "From base view", open: model.showForm ? true : false },
        AddSlotFormView(dispatch, model)
      ),
      h("pre", {}, JSON.stringify(model, null, 2)),
    ]
  );
}
