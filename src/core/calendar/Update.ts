import type { ActionType, Model, MonthsType } from "../../types";
import { MSGS } from "../../types";

export function isOpenMsg(isOpen: boolean) {
  return {
    type: MSGS.IS_OPEN,
    isOpen,
  };
}

export function isCloseMsg(isOpen: boolean) {
  return {
    type: MSGS.IS_CLOSE,
    isOpen,
  };
}

export function changeCurrentMonthMsg(currentMonth: MonthsType) {
  return {
    type: MSGS.CURRENT_MONTH,
    currentMonth,
  };
}

export function selectedDayMsg(selectedDay: number) {
  return {
    type: MSGS.SELECTED_DATE,
    selectedDay,
  };
}

export default function update(msg: ActionType, model: Model): Model {
  switch (msg.type) {
    case MSGS.IS_OPEN:
      const { isOpen } = msg;
      return { ...model, isOpen };
    case MSGS.IS_CLOSE:
      return { ...model, isOpen: msg.isOpen };
    case MSGS.CURRENT_MONTH:
      console.log("currentMonth");
      return { ...model, currentMonth: msg.currentMonth };
    case MSGS.SELECTED_DATE:
      console.log("selected date");
      const selectedDate = new Date(
        `${msg.selectedDay} ${model.currentMonth} ${model.currentYear}`
      );
      return { ...model, selectedDate };
    default:
      return model;
  }
}
