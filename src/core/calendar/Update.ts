import type { ActionType, Model, MonthType, SubmitData } from "../../types";
import { MSGS, Months as months } from "../../types";
import { createCommandManager } from "../command/new-commands";

export function changeCurrentMonthMsg(currentMonth: MonthType) {
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
  switch (msg.type) {
    case MSGS.CURRENT_MONTH:
      const { currentMonth } = msg;
      const indexOfMonth = months.findIndex(
        (month: MonthType) => month === currentMonth
      );

      return {
        ...model,
        currentMonth,
        month: indexOfMonth,
      };
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
    case MSGS.PREV_MONTH:
      const prevMonth = model.month - msg.amount;

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
    case MSGS.NEXT_MONTH:
      const nextMonth = model.month + msg.amount;

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
    case MSGS.GO_TO_TODAY:
      const today = new Date();

      return {
        ...model,
        month: today.getMonth(),
        year: today.getFullYear(),
      };
    case MSGS.ACTIVE_DAY:
      return {
        ...model,
        activeDay: msg.activeDay,
      };
    case MSGS.CURRENT_SLOT_ID:
      return {
        ...model,
        currentSlotId: msg.slotId,
      };
    case MSGS.SET_EVENTS_BEFORE_ADDING_SLOT:
      return {
        ...model,
        eventsBeforeAddedSlot: msg.eventsBeforeAddedSlot,
      };
    case MSGS.UNDO_ADD_LATEST_SLOT:
      const undoModel = { ...model, events: model.eventsBeforeAddedSlot };
      const undoManager = createCommandManager(undoModel, msg);

      undoManager.undo();

      return {
        ...undoModel,
      };
    case MSGS.ON_SUBMIT:
      const newModel = { ...model };
      const submitManager = createCommandManager(newModel, msg);

      submitManager.doCommand("ADD_SLOT");

      return {
        ...newModel,
      };
    default:
      return model;
  }
}
