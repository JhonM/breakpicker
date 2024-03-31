import {
  ActionType,
  CommandType,
  Model,
  MSGS,
  SubmitData,
} from "../../../types";
import { commandManager } from "../../command/command-manager";

export function onSubmitMsg(submitData: SubmitData) {
  return {
    type: MSGS.ON_SUBMIT,
    submitData,
  };
}

export const updateOnSubmit = ({
  msg,
  model,
}: {
  msg: ActionType;
  model: Model;
}) => {
  const newModel = { ...model };
  const commands: CommandType[] = ["ADD_SLOT"];
  const manager = commandManager({ model: newModel, msg });

  commands.forEach((command) => manager.doCommand(command));

  return {
    ...newModel,
  };
};
