import { h } from "@jhonm/blanc-vdom";
import {
  getYear,
  getMonth,
  getCalendarDays,
  getCurrentMonth,
  getCurrentYear,
} from "../../../helpers/dates";
import { DispatchType, Model } from "../../../types";
import { selectedDayMsg } from "../Update";
import { AddSlotView } from "./";
import {
  dayClass,
  monthClass,
  monthDayClass,
  currentDayClass,
  prevLastDayClass,
  dayContainerClass,
} from "../../../styles/styles.css";

function dayContainer(...props: any[]) {
  return h("div", { className: dayContainerClass }, ...props);
}

const selectedDate = (day: number) =>
  new Date(`${getCurrentYear}-${getCurrentMonth + 1}-${day}`);

export function monthView(dispatch: DispatchType, model: Model) {
  /*
  const daysArray = getCalendarDays().reduce((acc: any, i) => {
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

    const getEventDate = (model: Model) => (day: Date) =>
      model.events?.find((e) => e?.date.getDate() === day.getDate());
    const day = i - startWeekDay;
    let month;

    const selectedDateDay = selectedDate(day);
    const t = getEventDate(model)(selectedDateDay);

    const withSlots = t ? t : "";

    console.info(withSlots);
    if (i <= startWeekDay) {
      month = dayContainer(
        h(
          "div",
          {
            className: `${dayClass} ${prevLastDayClass} `,
            onclick: () => console.log("clicked prev last day"),
          },
          `${prevLastDay - i}`
        )
      );
    } else if (i <= startWeekDay + totalMonthDay) {
      currentDate.setDate(day);
      currentDate.setHours(0, 0, 0, 0);

      const currentDayOrMonthDay =
        currentDate.getTime() === new Date().setHours(0, 0, 0, 0)
          ? currentDayClass
          : monthDayClass;

      month = dayContainer(
        h(
          "div",
          {
            className: `${dayClass} ${currentDayOrMonthDay}`,
            onclick: () => dispatch(selectedDayMsg(day)),
          },
          ...[day.toString(), withSlots.toString()]
        ),
        AddSlotView(dispatch, model)
      );
    } else {
      month = dayContainer(
        h(
          "div",
          {
            className: dayClass,
            onclick: () => console.log("clicked day view else"),
          },
          `${day - totalMonthDay}`
        )
      );
    }

    if (Array.isArray(acc)) {
      acc.push(month);
    }

    return acc;
  }, []);
*/

  const { year, month } = model;
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;
  const daysArray = [];

  const getEventDate = (model: Model) => (day: Date) =>
    model.events?.find((e) => e?.date.getDate() === day.getDate());

  const selectedDateDay = selectedDate(day);
  const t = getEventDate(model)(selectedDateDay);

  let x = day;
  while (x > 0) {
    const view = dayContainer(
      h(
        "div",
        {
          className: `${dayClass} ${prevLastDayClass} `,
          onclick: () => console.log("clicked prev last day"),
        },
        `${prevDays - x + 1}`
      )
    );

    daysArray.push(view);

    x--;
  }

  let i = 1;
  while (i < lastDate) {
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      const view = dayContainer(
        h(
          "div",
          {
            className: `${dayClass} ${currentDayClass}`,
            onclick: () => dispatch(selectedDayMsg(day)),
          },
          `${i}`
        )
        // AddSlotView(dispatch, model)
      );

      daysArray.push(view);
    } else {
      const view = dayContainer(
        h(
          "div",
          {
            className: `${dayClass} ${monthDayClass}`,
            onclick: () => dispatch(selectedDayMsg(day)),
          },
          ...[`${i}`]
        )
      );

      daysArray.push(view);
    }
    i++;
  }

  let j = 1;
  while (j < nextDays) {
    const view = dayContainer(
      h(
        "div",
        {
          className: dayClass,
          onclick: () => console.log("clicked day view else"),
        },
        `${j}`
      )
    );

    daysArray.push(view);
    j++;
  }

  return h("div", { className: monthClass }, ...daysArray);
}
