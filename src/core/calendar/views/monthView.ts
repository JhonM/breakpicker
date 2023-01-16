import { h } from "@jhonm/blanc-vdom";
import { getYear, getMonth, getCalendarDays } from "../../../helpers/dates";
import { DispatchType, Model } from "../../../types";
import { prefixedNames } from "../../../helpers/prefix_builder";
import { selectedDayMsg } from "../Update";

export function monthView(
  dispatch: DispatchType,
  model: Model,
  selector: HTMLElement
) {
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
          className: prefixedNames("day prev-last-day"),
          onclick: () => console.log("clicked prev last day"),
        },
        `${prevLastDay - i}`
      );
    } else if (i <= startWeekDay + totalMonthDay) {
      currentDate.setDate(day);
      currentDate.setHours(0, 0, 0, 0);

      const dayClass =
        currentDate.getTime() === new Date().setHours(0, 0, 0, 0)
          ? prefixedNames("current-day")
          : prefixedNames("month-day");

      month = h(
        "div",
        {
          className: `${prefixedNames("day")} ${dayClass}`,
          onclick: () => dispatch(selectedDayMsg(day)),
        },
        day.toString()
      );
    } else {
      month = h(
        "div",
        {
          className: prefixedNames("day"),
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

  return h("div", { className: prefixedNames("month-view") }, ...daysArray);
}
