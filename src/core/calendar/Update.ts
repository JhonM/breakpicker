import type { ActionType, Model } from "../../types";
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

export function changeCurrentDateMsg(currentDate: Date) {
  return {
    type: MSGS.CURRENT_DATE,
    currentDate,
  };
}

export default function update(msg: ActionType, model: Model): any {
  switch (msg.type) {
    case MSGS.IS_OPEN:
      const { isOpen } = msg;
      return { ...model, isOpen };
    case MSGS.IS_CLOSE:
      return { ...model, isOpen: msg.isOpen };
    case MSGS.CURRENT_DATE:
      return { ...model, currentDate: new Date("2 January 2023") };
    default:
      return model;
  }
}
