import { ActionType, Model, MSGS, Months as months } from "../../../types";

export function prevMonthMsg(amount: number) {
  return {
    type: MSGS.PREV_MONTH,
    amount,
  };
}

export const updatePrevMonth = ({
  msg,
  model,
}: {
  msg: ActionType;
  model: Model;
}) => {
  if (msg.type !== MSGS.PREV_MONTH) return model;

  const prevMonth = model.month - msg.amount;

  if (prevMonth < 0) {
    return {
      ...model,
      month: 11,
      year: model.year - 1,
      currentMonth: months[11],
    };
  }

  return {
    ...model,
    month: prevMonth,
    currentMonth: months[prevMonth],
  };
};
