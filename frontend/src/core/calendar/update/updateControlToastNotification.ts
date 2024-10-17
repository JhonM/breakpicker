import { ActionType, Model, MSGS } from "../../../types";

export function showToastMsg(showToast: boolean) {
  return {
    type: MSGS.SHOW_TOAST,
    showToast,
  };
}

export const updateControlToastNotification = ({
  msg,
  model,
}: {
  msg: ActionType;
  model: Model;
}) => {
  if (msg.type !== MSGS.SHOW_TOAST) return model;

  const { showToast } = msg;

  return {
    ...model,
    showToast,
  };
};
