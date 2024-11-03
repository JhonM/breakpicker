import { ActionType, CommandType, Model, MSGS } from "../../../types";
import { commandManager } from "../../command/command-manager";

const variables = {
  mainTitle: "Some slot title",
  duration: 4,
  startDate: new Date(),
  endDate: new Date(),
};

export async function onSubmitErrorMsg() {
  return {
    type: MSGS.ON_SUBMIT_ERROR,
    submitData: {},
  };
}

export const updateOnSubmitError = ({
  msg,
  model,
}: {
  msg: ActionType;
  model: Model;
}) => {
  // console.info("update");
  // const newModel = { ...model };
  // const commands: CommandType[] = newModel.editMode
  //   ? ["EDIT_SLOT"]
  //   : ["ADD_SLOT"];
  // const manager = commandManager({ model: newModel, msg });

  // commands.forEach((command) => manager.doCommand(command));

  return {
    ...model,
    showForm: false,
  };
};
