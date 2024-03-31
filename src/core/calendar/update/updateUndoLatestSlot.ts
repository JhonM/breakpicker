import { ActionType, Model, MSGS } from "../../../types";
import { commandManager } from "../../command/command-manager";

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
  const newModel = { ...model, events: model.eventsBeforeAddedSlot };
  const manager = commandManager({ model: newModel, msg });

  manager.undo?.();

  return {
    ...newModel,
  };
};
