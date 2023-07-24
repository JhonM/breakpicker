import { h } from "@jhonm/blanc-vdom";
import { addSlotFormClass } from "../../../styles/styles.css";
import { DispatchType, Model } from "../../../types";
import { showAddFormMsg } from "../Update";

function input(dispatch: DispatchType, model: Model) {
  return h("input", { value: "null" });
}

function closeButton(onclick: () => void) {
  return h("button", { onclick }, "close");
}

export function addSlotFormView(dispatch: DispatchType, model: Model) {
  if (model.showAddForm) {
    return h(
      "form",
      {
        className: addSlotFormClass,
      },
      ...[closeButton(() => dispatch(showAddFormMsg(false))), input]
    );
  }

  return h("span", {});
}
