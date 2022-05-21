import { h } from "../../../core/vdom";
import { getYear, getMonth, getCalendarDays } from "../../../helpers/dates";
import { DispatchType, Model } from "../../../types";

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

  const toArr = getCalendarDays().reduce((acc: any, i) => {
    const day = i - startWeekDay;
    let month;

    if (i <= startWeekDay) {
      month = h(
        "div",
        { className: "day prev-last-day" },
        `${prevLastDay - i}`
      );
    } else if (i <= startWeekDay + totalMonthDay) {
      currentDate.setDate(day);
      currentDate.setHours(0, 0, 0, 0);

      const dayClass =
        currentDate.getTime() === new Date().setHours(0, 0, 0, 0)
          ? "current-day"
          : "month-day";

      month = h("div", { className: `day ${dayClass}` }, day.toString());
    } else {
      month = h("div", { className: "day" }, `${day - totalMonthDay}`);
    }

    if (Array.isArray(acc)) {
      acc.push(month);
    }

    return acc;
  }, []);

  return h("div", { className: "month-view" }, ...toArr);
}
