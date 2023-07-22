import { h } from "@jhonm/blanc-vdom";
import { getYear, getMonth, getCalendarDays } from "../../../helpers/dates";
import { DispatchType, Model } from "../../../types";
import { selectedDayMsg } from "../Update";
import {
  dayClass,
  monthClass,
  monthDayClass,
  currentDayClass,
  prevLastDayClass,
} from "../../../styles/styles.css";

export function monthView(dispatch: DispatchType, model: Model) {
  const currentDate = model.currentDate;

  const prevLastDay = new Date(
    getYear(currentDate),
    getMonth(currentDate),
    0
  ).getDate();
  const totalMonthDay = new Date(
    getYear(currentDate),
    getMonth(currentDate) + 1,
    0
  ).getDate();
  const startWeekDay = new Date(
    getYear(currentDate),
    getMonth(currentDate),
    1
  ).getDay();

  const daysArray = getCalendarDays().reduce((acc: any, i) => {
    const day = i - startWeekDay;
    let month;

    if (i <= startWeekDay) {
      month = h(
        "div",
        {
          className: `${dayClass} ${prevLastDayClass} `,
          onclick: () => console.log("clicked prev last day"),
        },
        `${prevLastDay - i}`
      );
    } else if (i <= startWeekDay + totalMonthDay) {
      currentDate.setDate(day);
      currentDate.setHours(0, 0, 0, 0);

      const currentDayOrMonthDay =
        currentDate.getTime() === new Date().setHours(0, 0, 0, 0)
          ? currentDayClass
          : monthDayClass;

      month = h(
        "div",
        {
          className: `${dayClass} ${currentDayOrMonthDay}`,
          onclick: () => dispatch(selectedDayMsg(day)),
        },
        day.toString()
      );
    } else {
      month = h(
        "div",
        {
          className: dayClass,
          onclick: () => console.log("clicked day view else"),
        },
        `${day - totalMonthDay}`
      );
    }

    if (Array.isArray(acc)) {
      acc.push(month);
    }

    return acc;
  }, []);

  return h("div", { className: monthClass }, ...daysArray);
}
