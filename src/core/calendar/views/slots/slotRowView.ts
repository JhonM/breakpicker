import { h } from "@jhonm/blanc-vdom";
import { DispatchType, Model, Slot } from "../../../../types";
import { SlotView } from ".";

export function slotRowView(dispatch: DispatchType, model: Model, slot: Slot) {
  return h(
    "div",
    { "data-slot-id": `${slot.id}` },
    SlotView(dispatch, slot, model)
  );
}
