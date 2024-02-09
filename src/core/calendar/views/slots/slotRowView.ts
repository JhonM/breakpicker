import { h } from "@jhonm/blanc-vdom";
import { DispatchType, Slot } from "../../../../types";
import { SlotView } from ".";

export function slotRowView(dispatch: DispatchType, slot: Slot) {
  return h("div", { "data-slot-id": `${slot.id}` }, SlotView(dispatch, slot));
}
