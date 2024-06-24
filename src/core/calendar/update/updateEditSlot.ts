import { ActionType, CommandType, MSGS, Model } from "../../../types";
import { commandManager } from "../../command/command-manager";

export function editSlotMsg(slotId: string) {
  return {
    type: MSGS.EDIT_SLOT,
    slotId,
  };
}

export const updateEditSlot = ({
  model,
  msg,
}: {
  model: Model;
  msg: ActionType;
}) => {
  const newModel = { ...model };
  const commands: CommandType[] = ["EDIT_SLOT"];
  const manager = commandManager({ model: newModel, msg });

  commands.forEach((command) => manager.doCommand(command));

  return {
    ...newModel,
  };
};
