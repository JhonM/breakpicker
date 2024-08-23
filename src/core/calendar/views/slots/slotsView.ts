import * as R from "ramda";
import { h } from "@jhonm/blanc-vdom";
import { DispatchType, EventType, Model, Slot } from "../../../../types";
import { SlotRowView } from ".";

export function slotsView({
  dispatch,
  slots,
  model,
  eventId,
}: {
  dispatch: DispatchType;
  slots: Slot[];
  model: Model;
  eventId: EventType["id"];
}) {
  const rows = R.map(R.partial(SlotRowView, [dispatch, model, eventId]), [
    ...slots,
  ]);

  return h("div", {}, ...rows);
}
