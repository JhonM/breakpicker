import { match } from "../../helpers/match";
import type { ActionType, Model, SubmitData } from "../../types";
import { MSGS, Months as months } from "../../types";
import { createCommandManager } from "../command";
import { updateCurrentMonth } from "./update/updateCurrentMonth";
import { updateSelectedDate } from "./update/updateSelectedDate";
import { updateShowAddForm } from "./update/updateShowAddForm";

export function prevMonthMsg(amount: number) {
  return {
    type: MSGS.PREV_MONTH,
    amount,
  };
}

export function nextMonthMsg(amount: number) {
  return {
    type: MSGS.NEXT_MONTH,
    amount,
  };
}

export function goToTodayMsg() {
  return {
    type: MSGS.GO_TO_TODAY,
  };
}

export function activeDayMsg(activeDay: number) {
  return {
    type: MSGS.ACTIVE_DAY,
    activeDay,
  };
}

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
      (x) => {
        if (x.type !== "PREV_MONTH") return model;

        const prevMonth = model.month - x.amount;

        if (prevMonth < 0) {
          return {
            ...model,
            month: 11,
            year: model.year - 1,
            currentMonth: months[11],
          };
        }

        return {
          ...model,
          month: prevMonth,
          currentMonth: months[prevMonth],
        };
      }
    )
    .on(
      (x) => x.type === MSGS.NEXT_MONTH,
      (x) => {
        if (x.type !== "NEXT_MONTH") return model;

        const nextMonth = model.month + x.amount;

        if (nextMonth > 11) {
          return {
            ...model,
            month: 0,
            year: model.year + 1,
            currentMonth: months[11],
          };
        }

        return {
          ...model,
          month: nextMonth,
          currentMonth: months[nextMonth],
        };
      }
    )
    .on(
      (x) => x.type === MSGS.GO_TO_TODAY,
      () => {
        const today = new Date();

        return {
          ...model,
          month: today.getMonth(),
          year: today.getFullYear(),
        };
      }
    )
    .on(
      (x) => x.type === MSGS.ACTIVE_DAY,
      (x) => {
        if (x.type !== "ACTIVE_DAY") return model;

        return {
          ...model,
          activeDay: x.activeDay,
        };
      }
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
