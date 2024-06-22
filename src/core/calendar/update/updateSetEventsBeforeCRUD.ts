import { ActionType, Model, MSGS } from "../../../types";

export function setEventsBeforeCRUD(eventsBeforeCRUD: Model["events"]) {
  return {
    type: MSGS.SET_EVENTS_BEFORE_CRUD,
    eventsBeforeCRUD,
  };
}

export const updateSetEventsBeforeCRUD = ({
  msg,
  model,
}: {
  msg: ActionType;
  model: Model;
}) => {
  if (msg.type !== MSGS.SET_EVENTS_BEFORE_CRUD) return model;

  return {
    ...model,
    eventsBeforeCRUD: msg.eventsBeforeCRUD,
  };
};
