import { ActionType, Model, MSGS } from "../../../types";
import { createCommandManager } from "../../command";

export function undoAddLatestSlotMsg() {
  return {
    type: MSGS.UNDO_ADD_LATEST_SLOT,
  };
}

export const updateUndoLatestSlot = ({
  msg,
  model,
}: {
  msg: ActionType;
  model: Model;
}) => {
  const undoModel = { ...model, events: model.eventsBeforeAddedSlot };
  const undoManager = createCommandManager(undoModel, msg);

  undoManager.undo();

  return {
    ...undoModel,
  };
};
