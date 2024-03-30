import {
  ActionType,
  CommandType,
  Model,
  MSGS,
  SubmitData,
} from "../../../types";
import { createCommandManager } from "../../command";

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
  const submitManager = createCommandManager(newModel, msg);
  const commands: CommandType[] = ["ADD_SLOT"];

  commands.forEach((commandType) => submitManager.doCommand(commandType));

  return {
    ...newModel,
  };
};
