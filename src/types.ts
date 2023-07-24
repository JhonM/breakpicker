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
  id: number;
  title: string;
  duration: number;
  startDate: Date;
}

export type Model = {
  currentDate: Date;
  currentMonth: MonthsType;
  currentYear: number;
  currentMonthDays: string[] | null;
  showAddForm: boolean;
  selectedDate?: Date;
  dateSlots?: Slot[] | null;
};

export type ActionType =
  | { type: "CURRENT_MONTH"; currentMonth: MonthsType }
  | { type: "SELECTED_DATE"; selectedDay: number }
  | { type: "SET_CURRENT_MONTH_DAYS"; currentMonthDays: string[] | null }
  | { type: "SHOW_ADD_FORM"; showAddForm: boolean };

export type DispatchType = (action: ActionType) => void;
