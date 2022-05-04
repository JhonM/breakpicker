import type { ActionType, Model } from "../../types";
import { MSGS } from "../../types";

export function isOpenMsg(isOpen: boolean) {
  return {
    type: MSGS.IS_OPEN,
    isOpen,
  };
}

export default function update(msg: ActionType, model: Model): any {
  switch (msg.type) {
    case MSGS.IS_OPEN:
      const { isOpen } = msg;
      return { ...model, isOpen };
  }
}
