import { match } from "../../helpers/match";
import type { ActionType, Model, SubmitData } from "../../types";
import { MSGS } from "../../types";
import { createCommandManager } from "../command";
import { updateActiveDay } from "./update/updateActiveDay";
import { updateCurrentMonth } from "./update/updateCurrentMonth";
import { updateGoToToday } from "./update/updateGoToToday";
import { updateNextMonth } from "./update/updateNextMonth";
import { updatePrevMonth } from "./update/updatePrevMonth";
import { updateSelectedDate } from "./update/updateSelectedDate";
import { updateShowAddForm } from "./update/updateShowAddForm";

export function onSubmitMsg(submitData: SubmitData) {
  return {
    type: MSGS.ON_SUBMIT,
    submitData,
  };
}

export function currentSlotIdMsg(slotId: number | null) {
  return {
    type: MSGS.CURRENT_SLOT_ID,
    slotId,
  };
}

export function setEventsBeforeAddingSlotMsg(
  eventsBeforeAddedSlot: Model["events"]
) {
  return {
    type: MSGS.SET_EVENTS_BEFORE_ADDING_SLOT,
    eventsBeforeAddedSlot,
  };
}

export function undoAddLatestSlotMsg() {
  return {
    type: MSGS.UNDO_ADD_LATEST_SLOT,
  };
}

export default function update(msg: ActionType, model: Model): Model {
  return match<ActionType, Model>(msg)
    .on(
      (x) => x.type === MSGS.CURRENT_MONTH,
      (x) => updateCurrentMonth({ msg: x, model })
    )
    .on(
      (x) => x.type === MSGS.SELECTED_DATE,
      (x) => updateSelectedDate({ msg: x, model })
    )
    .on(
      (x) => x.type === MSGS.SHOW_ADD_FORM,
      (x) => updateShowAddForm({ msg: x, model })
    )
    .on(
      (x) => x.type === MSGS.PREV_MONTH,
      (x) => updatePrevMonth({ msg: x, model })
    )
    .on(
      (x) => x.type === MSGS.NEXT_MONTH,
      (x) => updateNextMonth({ msg: x, model })
    )
    .on(
      (x) => x.type === MSGS.GO_TO_TODAY,
      () => updateGoToToday({ model })
    )
    .on(
      (x) => x.type === MSGS.ACTIVE_DAY,
      (x) => updateActiveDay({ msg: x, model })
    )
    .on(
      (x) => x.type === MSGS.CURRENT_SLOT_ID,
      (x) => {
        if (x.type !== "CURRENT_SLOT_ID") return model;

        return {
          ...model,
          currentSlotId: x.slotId,
        };
      }
    )
    .on(
      (x) => x.type === MSGS.SET_EVENTS_BEFORE_ADDING_SLOT,
      (x) => {
        if (x.type !== "SET_EVENTS_BEFORE_ADDING_SLOT") return model;

        return {
          ...model,
          eventsBeforeAddedSlot: x.eventsBeforeAddedSlot,
        };
      }
    )
    .on(
      (x) => x.type === MSGS.UNDO_ADD_LATEST_SLOT,
      () => {
        const undoModel = { ...model, events: model.eventsBeforeAddedSlot };
        const undoManager = createCommandManager(undoModel, msg);

        undoManager.undo();

        return {
          ...undoModel,
        };
      }
    )
    .on(
      (x) => x.type === MSGS.ON_SUBMIT,
      () => {
        const newModel = { ...model };
        const submitManager = createCommandManager(newModel, msg);

        submitManager.doCommand("ADD_SLOT");

        return {
          ...newModel,
        };
      }
    )
    .otherwise(() => model);
}
