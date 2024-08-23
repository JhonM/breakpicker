import { h } from "@jhonm/blanc-vdom";
import { DispatchType, EventType, Model, Slot } from "../../../../types";
import { SlotView } from ".";

export function slotRowView(
  dispatch: DispatchType,
  model: Model,
  eventId: EventType["id"],
  slot: Slot
) {
  return h(
    "div",
    { "data-slot-id": `${slot.id}` },
    SlotView(dispatch, slot, model, eventId)
  );
}
