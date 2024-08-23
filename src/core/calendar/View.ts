import { h } from "@jhonm/blanc-vdom";
import type { Model, DispatchType } from "../../types";
import { CalendarView, AddSlotFormView, ToastView } from "./views";
import { containerClass } from "../../styles/styles.css";
import { undoAddLatestSlotMsg } from "./update/updateUndoLatestSlot";
import { DialogFormView } from "./views/dialog-form";
import { showAddFormMsg } from "./update/updateShowAddForm";

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
      DialogFormView({
        dispatch,
        contentView: [
          h(
            "h2",
            {
              slot: "header",
            },
            "Header Content"
          ),
          h(
            "div",
            {
              slot: "content",
              onclick: () => console.info("testing"),
            },
            AddSlotFormView(dispatch, model)
          ),
        ],
      }),
      h(
        "button",
        {
          onclick: () => {
            const modal = document.getElementById(
              "dialog-instance"
            ) as HTMLDialogElement;

            modal.showModal();
          },
        },
        "open modal"
      ),
      h("pre", {}, JSON.stringify(model, null, 2)),
    ]
  );
}
