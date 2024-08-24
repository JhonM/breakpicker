import { h } from "@jhonm/blanc-vdom";
import { DispatchType, Model } from "../../../types";
import { showAddFormMsg } from "../update/updateShowAddForm";
import { editSlotMsg } from "../update/updateEditSlot";

export function addSlotView(dispatch: DispatchType, model: Model) {
  return h(
    "button",
    {
      className: "addd",
      onclick: () => {
        console.info("add");
        dispatch(showAddFormMsg(true));
      },
    },
    "Add"
  );
}
