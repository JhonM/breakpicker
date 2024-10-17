import { h } from "@jhonm/blanc-vdom";
import { DispatchType, EventType, Model } from "../../../../types";
import { eventClass } from "../../../../styles/styles.css";
import { SlotsView } from "../slots";

export function eventView(
  dispatch: DispatchType,
  model: Model,
  event?: EventType
) {
  if (!event?.slots) {
    return h("div", {});
  }

  return h(
    "div",
    { className: eventClass },
    SlotsView({ dispatch, slots: event.slots, eventId: event.id, model })
  );
}
