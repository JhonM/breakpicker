import { h } from "@jhonm/blanc-vdom";
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

export function monthView(dispatch: DispatchType, model: Model) {
  const { year, month } = model;
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;
  const daysArray = [];
  const selectedDate = (day: number) =>
    new Date(`${model.year}-${model.month + 1}-${day}`);

  const findSlots = model.events
    ?.filter((event) => event.slots)
    .filter((e) => e.date);

  let x = day;
  while (x > 0) {
    const view = dayContainer(
      h(
        "div",
        {
          className: `${dayClass} ${prevLastDayClass} `,
          onclick: () => console.log("clicked prev last day"),
          "data-day": `${prevDays - x + 1}`,
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
            "data-day": `${i}`,
          },
          `${i}`
        ),
        AddSlotView(dispatch, model)
      );

      daysArray.push(view);
    } else {
      const slots = findSlots?.filter(
        (event) =>
          event.date.toLocaleDateString() ===
          selectedDate(i).toLocaleDateString()
      );

      const view = dayContainer(
        h(
          "div",
          {
            className: `${dayClass} ${monthDayClass}`,
            onclick: () => dispatch(selectedDayMsg(day)),
            "data-day": `${i}`,
          },
          ...[`${i}`, `${slots}`, AddSlotView(dispatch, model)]
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
          "data-day": `${j}`,
        },
        `${j}`
      )
    );

    daysArray.push(view);
    j++;
  }

  return h("div", { className: monthClass }, ...daysArray);
}
