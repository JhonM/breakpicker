import { h } from "@jhonm/blanc-vdom";
import { DispatchType, Model, Slot } from "../../../../types";
import { deleteSlotMsg } from "../../update/updateDeleteSlot";
import { currentSlotIdMsg } from "../../update/updateCurrentSlotId";
import { setEventsBeforeAddingSlotMsg } from "../../update/updateSetEventsBeforeAddingSlot";

function slotTitle(title: Slot["title"]) {
  return h("div", {}, title);
}

function slotDeleteButton(
  dispatch: DispatchType,
  id: Slot["id"],
  startDate: Slot["startDate"],
  model: Model
) {
  return h(
    "div",
    {
      onclick: (e: Event) => {
        e.stopPropagation();
        dispatch(setEventsBeforeAddingSlotMsg(model.events));
        dispatch(deleteSlotMsg(id, startDate));
        dispatch(currentSlotIdMsg(id));
      },
    },
    "X"
  );
}
export function slotView(dispatch: DispatchType, slot: Slot, model: Model) {
  const { title, id, startDate } = slot;

  return h(
    "div",
    {},
    ...[slotTitle(title), slotDeleteButton(dispatch, id, startDate, model)]
  );
}
