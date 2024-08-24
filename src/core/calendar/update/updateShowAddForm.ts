import { ActionType, Model, MSGS } from "../../../types";

export function showAddFormMsg(showForm: boolean) {
  return {
    type: MSGS.SHOW_ADD_FORM,
    showForm,
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

  const { showForm } = msg;

  if (showForm) {
    return {
      ...model,
      showForm,
    };
  }

  return {
    ...model,
    showForm,
    editMode: false,
    editId: null,
    eventId: null,
  };
};
