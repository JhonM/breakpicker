export const MSGS = {
  IS_OPEN: "IS_OPEN",
  IS_CLOSE: "IS_CLOSE",
} as const;

export type MsgType = typeof MSGS[keyof typeof MSGS];

export type Model = {
  isOpen: boolean;
  currentDate: Date;
};

export type ActionType =
  | { type: "IS_OPEN"; isOpen: boolean }
  | { type: "IS_CLOSE"; isOpen: boolean };
