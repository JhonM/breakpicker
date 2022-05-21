export const MSGS = {
  IS_OPEN: "IS_OPEN",
  IS_CLOSE: "IS_CLOSE",
  CURRENT_MONTH: "CURRENT_MONTH",
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
  | { type: "CURRENT_MONTH"; currentMonth: MonthsType };

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
