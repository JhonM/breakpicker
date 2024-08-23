import { h } from "@jhonm/blanc-vdom";
import { DispatchType, EventType, Model, Slot } from "../../../../types";
import { editSlotMsg } from "../../update/updateEditSlot";
import { setEventsBeforeCRUD } from "../../update/updateSetEventsBeforeCRUD";
import { showAddFormMsg } from "../../update/updateShowAddForm";

type Props = {
  title: Slot["title"];
  id: string;
  dispatch: DispatchType;
  model: Model;
  eventId: EventType["id"];
};

export function slotTitle({ dispatch, title, id, model, eventId }: Props) {
  console.info(eventId, "slotTitle");
  return h(
    "div",
    {
      onclick: (e: Event) => {
        e.stopPropagation();
        dispatch(setEventsBeforeCRUD(model.events));
        dispatch(editSlotMsg(id));
        dispatch(showAddFormMsg(true));
      },
    },
    title
  );
}
