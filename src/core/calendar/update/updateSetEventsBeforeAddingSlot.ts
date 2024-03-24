import { ActionType, Model, MSGS } from "../../../types";

export function setEventsBeforeAddingSlotMsg(
  eventsBeforeAddedSlot: Model["events"]
) {
  return {
    type: MSGS.SET_EVENTS_BEFORE_ADDING_SLOT,
    eventsBeforeAddedSlot,
  };
}

export const updateSetEventsBeforeAddingSlot = ({
  msg,
  model,
}: {
  msg: ActionType;
  model: Model;
}) => {
  if (msg.type !== MSGS.SET_EVENTS_BEFORE_ADDING_SLOT) return model;

  return {
    ...model,
    eventsBeforeAddedSlot: msg.eventsBeforeAddedSlot,
  };
};
