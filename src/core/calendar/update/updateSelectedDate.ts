import { ActionType, Model, MSGS } from "../../../types";

export function selectedDayMsg(selectedDay: number) {
  return {
    type: MSGS.SELECTED_DATE,
    selectedDay,
  };
}

export const updateSelectedDate = ({
  msg,
  model,
}: {
  msg: ActionType;
  model: Model;
}) => {
  if (msg.type !== MSGS.SELECTED_DATE) return model;

  const selectedDate = new Date(
    `${msg.selectedDay} ${model.currentMonth} ${model.currentYear}`
  );
  console.log("selected date", selectedDate);
  return { ...model, selectedDate };
};
