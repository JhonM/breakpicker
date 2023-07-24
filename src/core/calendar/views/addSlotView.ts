import { h } from "@jhonm/blanc-vdom";
import { showAddFormMsg } from "../Update";
import { DispatchType, Model } from "../../../types";

export function addSlotView(dispatch: DispatchType, model: Model) {
  return h(
    "button",
    {
      className: "addd",
      onclick: () => dispatch(showAddFormMsg(true)),
    },
    "Add"
  );
}
