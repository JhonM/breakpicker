import { h } from "../../../core/vdom";
import { guid } from "../../../helpers/random";
import { getYear, getMonthName } from "../../../helpers/dates";
import { isOpenMsg, isCloseMsg } from "../Update";
import { DispatchType, Model } from "../../../types";
import { DaysOfWeekView } from "../views";

function monthView(dispatch: DispatchType, model: Model) {
  const currentDate = new Date(model.currentDate);

  const prevLastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  ).getDate();
  const totalMonthDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const startWeekDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const totalCalendarDay = 6 * 7;

  var start = 0;
  const months = Array(totalCalendarDay - start + 1)
    .fill(true)
    .map(() => start++);

  const toArr = months.reduce((acc: any, i) => {
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

export function calendarView(
  dispatch: DispatchType,
  model: Model,
  selector: HTMLElement
) {
  if (selector) {
    selector.onfocus = () => dispatch(isOpenMsg(true));
  }

  if (model.isOpen) {
    const todayDate = `${getMonthName(model.currentDate)} ${getYear(
      model.currentDate
    )}`;
    return h(
      "div",
      {
        "data-breakpicker-id": `${guid()}`,
        "data-breakpicker-open": `${model.isOpen ? "true" : "false"}`,
      },
      h(
        "div",
        { "data-breakpicker-type": "container" },
        h("button", { onclick: () => dispatch(isCloseMsg(false)) }, "Close"),
        h("div", { "data-calendar-type": "head" }, `${todayDate}`),
        h("div", { "data-calendar-type": "body" }, DaysOfWeekView()),
        h("div", { "data-calendar-type": "foot" }, monthView(dispatch, model))
      )
    );
  }

  return h("div", {}, "");
}
