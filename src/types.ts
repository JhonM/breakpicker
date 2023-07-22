export const MSGS = {
  CURRENT_MONTH: "CURRENT_MONTH",
  SELECTED_DATE: "SELECTED_DATE",
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

export type Model = {
  currentDate: Date;
  currentMonth: MonthsType;
  currentYear: number;
  selectedDate?: Date;
};

export type ActionType =
  | { type: "CURRENT_MONTH"; currentMonth: MonthsType }
  | { type: "SELECTED_DATE"; selectedDay: number };

export type DispatchType = (action: ActionType) => void;
