import { h } from "@jhonm/blanc-vdom";
import { DispatchType, EventType } from "../../../../types";
import { eventClass } from "../../../../styles/styles.css";
import { SlotsView } from "../slots";

export function eventView(dispatch: DispatchType, event: EventType) {
  if (!event.slots) {
    return h("div", { className: eventClass }, "add new slot");
  }

  return h("div", { className: eventClass }, SlotsView(dispatch, event.slots));
}
