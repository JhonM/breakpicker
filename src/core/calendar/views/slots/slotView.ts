import { h } from "@jhonm/blanc-vdom";
import { DispatchType, Slot } from "../../../../types";
import { deleteSlotMsg } from "../../update/updateDeleteSlot";
import { currentSlotIdMsg } from "../../update/updateCurrentSlotId";

function slotTitle(title: Slot["title"]) {
  return h("div", {}, title);
}

function slotDeleteButton(
  dispatch: DispatchType,
  id: Slot["id"],
  date: Slot["date"]
) {
  return h(
    "div",
    {
      onclick: (e: Event) => {
        e.stopPropagation();
        dispatch(deleteSlotMsg(id, date));
        dispatch(currentSlotIdMsg(id));
      },
    },
    "X"
  );
}
export function slotView(dispatch: DispatchType, slot: Slot) {
  const { title, id, date } = slot;

  return h(
    "div",
    {},
    ...[slotTitle(title), slotDeleteButton(dispatch, id, date)]
  );
}
