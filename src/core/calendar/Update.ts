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

export default function update(msg: ActionType, model: Model): any {
  switch (msg.type) {
    case MSGS.IS_OPEN:
      const { isOpen } = msg;
      return { ...model, isOpen };
    case MSGS.IS_CLOSE:
      return { ...model, isOpen: msg.isOpen };
  }
}
