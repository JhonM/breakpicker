import * as R from "ramda";
import { h } from "@jhonm/blanc-vdom";
import { DispatchType, Slot } from "../../../../types";
import { SlotRowView } from ".";

export function slotsView(dispatch: DispatchType, slots: Slot[]) {
  const rows = R.map(R.partial(SlotRowView, [dispatch]), [...slots]);

  return h("div", {}, ...rows);
}
