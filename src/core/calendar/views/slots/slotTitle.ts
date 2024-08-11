import { h } from "@jhonm/blanc-vdom";
import { DispatchType, Model, Slot } from "../../../../types";
import { editSlotMsg } from "../../update/updateEditSlot";
import { setEventsBeforeCRUD } from "../../update/updateSetEventsBeforeCRUD";
import { showAddFormMsg } from "../../update/updateShowAddForm";

type Props = {
  title: Slot["title"];
  id: string;
  dispatch: DispatchType;
  model: Model;
};

export function slotTitle({ dispatch, title, id, model }: Props) {
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
