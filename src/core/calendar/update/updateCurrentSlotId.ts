import { ActionType, Model, MSGS } from "../../../types";

export function currentSlotIdMsg(slotId: string | null) {
  return {
    type: MSGS.CURRENT_SLOT_ID,
    slotId,
  };
}

export const updateCurrentSlotId = ({
  msg,
  model,
}: {
  msg: ActionType;
  model: Model;
}) => {
  if (msg.type !== MSGS.CURRENT_SLOT_ID) return model;

  return {
    ...model,
    currentSlotId: msg.slotId,
  };
};
