export const MSGS = {
  IS_OPEN: "IS_OPEN",
  IS_CLOSE: "IS_CLOSE",
  CURRENT_DATE: "CURRENT_DATE",
} as const;

export type MsgType = typeof MSGS[keyof typeof MSGS];

export type Model = {
  isOpen: boolean;
  currentDate: Date;
  currentMonth: MonthsType;
};

export type ActionType =
  | { type: "IS_OPEN"; isOpen: boolean }
  | { type: "IS_CLOSE"; isOpen: boolean }
  | { type: "CURRENT_DATE"; currentDate: Date };

export type DispatchType = (action: ActionType) => void;

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

export type MonthsType = typeof Months[keyof typeof Months];
