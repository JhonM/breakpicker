import { ActionType, CommandType, Model, MSGS } from "../../../types";
import { commandManager } from "../../command/command-manager";

export function deleteSlotMsg(slotId: string, startDate: Date) {
  return {
    type: MSGS.DELETE_SLOT,
    slotId,
    startDate,
  };
}

export const updateDeleteSlot = ({
  model,
  msg,
}: {
  msg: ActionType;
  model: Model;
}) => {
  const newModel = { ...model };
  const commands: CommandType[] = ["DELETE_SLOT"];
  const manager = commandManager({ model: newModel, msg });

  commands.forEach((command) => manager.doCommand(command));

  return {
    ...newModel,
  };
};
