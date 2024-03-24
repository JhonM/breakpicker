import {
  ActionType,
  Model,
  MonthType,
  MSGS,
  Months as months,
} from "../../../types";

export function changeCurrentMonthMsg(currentMonth: MonthType) {
  return {
    type: MSGS.CURRENT_MONTH,
    currentMonth,
  };
}

export const updateCurrentMonth = ({
  msg,
  model,
}: {
  msg: ActionType;
  model: Model;
}) => {
  if (msg.type !== MSGS.CURRENT_MONTH) return model;

  const { currentMonth } = msg;
  const indexOfMonth = months.findIndex(
    (month: MonthType) => month === currentMonth
  );

  return {
    ...model,
    currentMonth,
    month: indexOfMonth,
  };
};
