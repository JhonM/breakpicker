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

export function changeCurrentMonth(currentMonth: MonthsType) {
  return {
    type: MSGS.CURRENT_MONTH,
    currentMonth,
  };
}

export default function update(msg: ActionType, model: Model): any {
  switch (msg.type) {
    case MSGS.IS_OPEN:
      const { isOpen } = msg;
      return { ...model, isOpen };
    case MSGS.IS_CLOSE:
      return { ...model, isOpen: msg.isOpen };
    case MSGS.CURRENT_MONTH:
      console.log("currentMonth");
      return { ...model, currentMonth: msg.currentMonth };
    default:
      return model;
  }
}
