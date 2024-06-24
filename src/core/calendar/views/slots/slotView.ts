import { h } from "@jhonm/blanc-vdom";
import { DispatchType, Model, Slot } from "../../../../types";
import { deleteSlotMsg } from "../../update/updateDeleteSlot";
import { currentSlotIdMsg } from "../../update/updateCurrentSlotId";
import { setEventsBeforeCRUD } from "../../update/updateSetEventsBeforeCRUD";
import { slotTitle } from "./slotTitle";

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
        dispatch(setEventsBeforeCRUD(model.events));
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
    ...[
      slotTitle({ dispatch, title, id, model }),
      slotDeleteButton(dispatch, id, startDate, model),
    ]
  );
}
