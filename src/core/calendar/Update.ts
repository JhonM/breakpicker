import type { ActionType, Model, MonthsType } from "../../types";
import { MSGS } from "../../types";

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

export function showAddFormMsg(showAddForm: boolean) {
  return {
    type: MSGS.SHOW_ADD_FORM,
    showAddForm,
  };
}

export default function update(msg: ActionType, model: Model): Model {
  switch (msg.type) {
    case MSGS.CURRENT_MONTH:
      console.log("currentMonth");
      return { ...model, currentMonth: msg.currentMonth };
    case MSGS.SELECTED_DATE:
      const selectedDate = new Date(
        `${msg.selectedDay} ${model.currentMonth} ${model.currentYear}`
      );
      console.log("selected date", selectedDate);
      return { ...model, selectedDate };
    case MSGS.SHOW_ADD_FORM:
      const { showAddForm } = msg;
      return {
        ...model,
        showAddForm,
      };
    default:
      return model;
  }
}
