export const MSGS = {
  CURRENT_MONTH: "CURRENT_MONTH",
  SELECTED_DATE: "SELECTED_DATE",
  SET_CURRENT_MONTH_DAYS: "SET_CURRENT_MONTH_DAYS",
  SHOW_ADD_FORM: "SHOW_ADD_FORM",
  PREV_MONTH: "PREV_MONTH",
  NEXT_MONTH: "NEXT_MONTH",
  GO_TO_TODAY: "GO_TO_TODAY",
  ACTIVE_DAY: "ACTIVE_DAY",
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
  showAddForm: boolean;
  activeDay?: number;
  selectedDate?: Date;
  events?: EventType[];
};

export type ActionType =
  | { type: "CURRENT_MONTH"; currentMonth: MonthType }
  | { type: "SELECTED_DATE"; selectedDay: number }
  | { type: "SET_CURRENT_MONTH_DAYS"; currentMonthDays: string[] | null }
  | { type: "PREV_MONTH"; amount: number }
  | { type: "NEXT_MONTH"; amount: number }
  | { type: "GO_TO_TODAY" }
  | { type: "ACTIVE_DAY"; activeDay: number }
  | { type: "SHOW_ADD_FORM"; showAddForm: boolean };

export type DispatchType = (action: ActionType) => void;
