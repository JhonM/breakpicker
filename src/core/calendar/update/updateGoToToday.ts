import { Model, MSGS } from "../../../types";

export function goToTodayMsg() {
  return {
    type: MSGS.GO_TO_TODAY,
  };
}

export const updateGoToToday = ({ model }: { model: Model }) => {
  const today = new Date();

  return {
    ...model,
    month: today.getMonth(),
    year: today.getFullYear(),
  };
};
