import { ActionType, Model, MSGS, Months as months } from "../../../types";

export function nextMonthMsg(amount: number) {
  return {
    type: MSGS.NEXT_MONTH,
    amount,
  };
}

export const updateNextMonth = ({
  msg,
  model,
}: {
  msg: ActionType;
  model: Model;
}) => {
  if (msg.type !== MSGS.NEXT_MONTH) return model;

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
};
