import { h } from "@jhonm/blanc-vdom";
import { DispatchType, Model, Slot } from "../../../../types";
import { editSlotMsg } from "../../update/updateEditSlot";

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
        dispatch(editSlotMsg(id));
      },
    },
    title
  );
}
