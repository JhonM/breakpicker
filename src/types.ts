export const MSGS = {
  IS_OPEN: "IS_OPEN",
} as const;

export type MsgType = typeof MSGS[keyof typeof MSGS];
export type Msgs = "INCREMENT" | "DECREMENT" | "IS_OPEN";

export type Model = {
  isOpen: boolean;
  currentDate: Date;
};

export type ActionType = { type: "IS_OPEN"; isOpen: boolean };
