import { createEventQuery } from "../../../api/createEventQuery";
import { createSlotQuery } from "../../../api/createSlotQuery";
import { updateSlotQuery } from "../../../api/updateSlotQuery";
import {
  ActionType,
  CommandType,
  Model,
  MSGS,
  SubmitData,
} from "../../../types";
import { commandManager } from "../../command/command-manager";

export async function onSubmitMsg(
  submitData: SubmitData,
  eventId?: string | null
) {
  const variables = {
    mainTitle: submitData.mainTitle,
    duration: Number(submitData.duration),
    startDate: submitData.startDate,
    endDate: submitData.endDate,
  };

  try {
    let data;
    let id;

    if (eventId && submitData.slotId) {
      const response = await updateSlotQuery({
        ...variables,
        id: submitData.slotId,
      });
      data = response?.data;
      id = eventId;
    } else {
      const response = await createSlotQuery(variables);
      const newEventId = await createEventQuery({ date: submitData.startDate });

      id = newEventId?.data.id;
      data = response?.data;
    }

    return {
      type: MSGS.ON_SUBMIT,
      submitData: { ...data, eventId: id },
    };
  } catch (error) {
    return {
      type: MSGS.ON_SUBMIT_ERROR,
      submitData: {},
    };
  }
}

export const updateOnSubmit = ({
  msg,
  model,
}: {
  msg: ActionType;
  model: Model;
}) => {
  const newModel = { ...model };
  const commands: CommandType[] = newModel.editMode
    ? ["EDIT_SLOT"]
    : ["ADD_SLOT"];
  const manager = commandManager({ model: newModel, msg });

  commands.forEach((command) => manager.doCommand(command));

  return {
    ...newModel,
  };
};
