import { ActionType, CommandType, MSGS, Model } from "../../../types";
import { commandManager } from "../../command/command-manager";

export function editSlotMsg(slotId: string, eventId: string) {
  return {
    type: MSGS.EDIT_SLOT,
    slotId,
    eventId,
  };
}

export const updateEditSlot = ({
  model,
  msg,
}: {
  model: Model;
  msg: ActionType;
}) => {
  if (msg.type !== MSGS.EDIT_SLOT) return model;

  const newModel = { ...model };
  const commands: CommandType[] = ["EDIT_SLOT"];
  const manager = commandManager({ model: newModel, msg });

  commands.forEach((command) => manager.doCommand(command));

  const { slotId, eventId } = msg;

  return {
    ...newModel,
    editMode: true,
    editId: slotId,
    eventId,
  };
};
