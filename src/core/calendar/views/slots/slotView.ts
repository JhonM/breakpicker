import { h } from "@jhonm/blanc-vdom";
import { DispatchType, Slot } from "../../../../types";

export function slotView(dispatch: DispatchType, slot: Slot) {
  const { title, id } = slot;

  return h("div", {}, title);
}
