export const MSGS = {
  CURRENT_MONTH: "CURRENT_MONTH",
  SELECTED_DATE: "SELECTED_DATE",
  SET_CURRENT_MONTH_DAYS: "SET_CURRENT_MONTH_DAYS",
  SHOW_ADD_FORM: "SHOW_ADD_FORM",
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

export type MonthsType = (typeof Months)[keyof typeof Months];

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
  activeDay: string;
  currentDate: Date;
  currentMonth: MonthsType;
  currentYear: number;
  currentMonthDays: string[] | null;
  showAddForm: boolean;
  selectedDate?: Date;
  // events?: EventType[] | null;
};

export type ActionType =
  | { type: "CURRENT_MONTH"; currentMonth: MonthsType }
  | { type: "SELECTED_DATE"; selectedDay: number }
  | { type: "SET_CURRENT_MONTH_DAYS"; currentMonthDays: string[] | null }
  | { type: "SHOW_ADD_FORM"; showAddForm: boolean };

export type DispatchType = (action: ActionType) => void;
