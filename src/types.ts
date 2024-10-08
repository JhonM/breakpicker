export const MSGS = {
  CURRENT_MONTH: "CURRENT_MONTH",
  SELECTED_DATE: "SELECTED_DATE",
  SET_CURRENT_MONTH_DAYS: "SET_CURRENT_MONTH_DAYS",
  SHOW_ADD_FORM: "SHOW_ADD_FORM",
  PREV_MONTH: "PREV_MONTH",
  NEXT_MONTH: "NEXT_MONTH",
  GO_TO_TODAY: "GO_TO_TODAY",
  ACTIVE_DAY: "ACTIVE_DAY",
  ON_SUBMIT: "ON_SUBMIT",
  CURRENT_SLOT_ID: "CURRENT_SLOT_ID",
  SET_EVENTS_BEFORE_CRUD: "SET_EVENTS_BEFORE_CRUD",
  UNDO_ADD_LATEST_SLOT: "UNDO_ADD_LATEST_SLOT",
  SHOW_TOAST: "SHOW_TOAST",
  DELETE_SLOT: "DELETE_SLOT",
  EDIT_SLOT: "EDIT_SLOT",
} as const;

export const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export type MonthType = (typeof Months)[keyof typeof Months];

export type MsgType = (typeof MSGS)[keyof typeof MSGS];

export interface Slot {
  id: string;
  title: string;
  duration: number;
  date: Date;
  startDate: Date;
  endDate: Date;
}

export interface EventType {
  id: string;
  date: Date;
  slots?: Slot[];
}

export type Model = {
  month: number;
  year: number;
  currentDate: Date;
  currentMonth: MonthType;
  currentYear: number;
  currentMonthDays: string[] | null;
  showForm: boolean;
  editMode: boolean;
  nextId: number;
  editId: string | null;
  eventId: string | null;
  currentSlotId: string | null;
  eventsBeforeCRUD?: Model["events"];
  activeDay?: number;
  selectedDate?: Date;
  events?: EventType[];
  showToast?: boolean;
};

export type SubmitData = {
  title: string;
  duration: number;
  date: Date;
  slotId: string | null;
};

export type ActionType =
  | { type: "CURRENT_MONTH"; currentMonth: MonthType }
  | { type: "SELECTED_DATE"; selectedDay: number }
  | { type: "SET_CURRENT_MONTH_DAYS"; currentMonthDays: string[] | null }
  | { type: "PREV_MONTH"; amount: number }
  | { type: "NEXT_MONTH"; amount: number }
  | { type: "GO_TO_TODAY" }
  | { type: "ACTIVE_DAY"; activeDay: number }
  | { type: "ON_SUBMIT"; submitData: SubmitData }
  | { type: "SHOW_ADD_FORM"; showForm: boolean }
  | { type: "CURRENT_SLOT_ID"; slotId: string | null }
  | {
      type: "SET_EVENTS_BEFORE_CRUD";
      eventsBeforeCRUD: Model["events"];
    }
  | { type: "UNDO_ADD_LATEST_SLOT" }
  | { type: "SHOW_TOAST"; showToast: boolean }
  | { type: "DELETE_SLOT"; slotId: string; startDate: Date }
  | { type: "EDIT_SLOT"; slotId: string; eventId: EventType["id"] };

export type DispatchType = (action: ActionType) => void;

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};

export type CommandType =
  | "ADD_SLOT"
  | "DELETE_SLOT"
  | "EDIT_SLOT"
  | "COPY_EVENT";
