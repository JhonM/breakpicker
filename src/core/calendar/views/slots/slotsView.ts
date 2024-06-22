import * as R from "ramda";
import { h } from "@jhonm/blanc-vdom";
import { DispatchType, Model, Slot } from "../../../../types";
import { SlotRowView } from ".";

export function slotsView(dispatch: DispatchType, slots: Slot[], model: Model) {
  const rows = R.map(R.partial(SlotRowView, [dispatch, model]), [...slots]);

  return h("div", {}, ...rows);
}
