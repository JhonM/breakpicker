import { ActionType, Model, MSGS } from "../../../types";

export function showAddFormMsg(showAddForm: boolean) {
  return {
    type: MSGS.SHOW_ADD_FORM,
    showAddForm,
  };
}

export const updateShowAddForm = ({
  msg,
  model,
}: {
  msg: ActionType;
  model: Model;
}) => {
  if (msg.type !== MSGS.SHOW_ADD_FORM) return model;

  const { showAddForm } = msg;
  return {
    ...model,
    showAddForm,
  };
};
