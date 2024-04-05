import { ActionType, Model, MSGS } from "../../../types";

export function deleteSlotMsg(slotId: string) {
  return {
    type: MSGS.DELETE_SLOT,
    slotId,
  };
}

export const updateDeleteSlot = ({
  model,
  msg,
}: {
  msg: ActionType;
  model: Model;
}) => {
  return {
    ...model,
  };
};
