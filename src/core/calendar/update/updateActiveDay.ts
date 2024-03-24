import { ActionType, Model, MSGS } from "../../../types";

export function activeDayMsg(activeDay: number) {
  return {
    type: MSGS.ACTIVE_DAY,
    activeDay,
  };
}

export const updateActiveDay = ({
  msg,
  model,
}: {
  msg: ActionType;
  model: Model;
}) => {
  if (msg.type !== MSGS.ACTIVE_DAY) return model;

  return {
    ...model,
    activeDay: msg.activeDay,
  };
};
