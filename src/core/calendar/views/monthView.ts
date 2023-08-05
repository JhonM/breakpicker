import * as R from "ramda";
import { h } from "@jhonm/blanc-vdom";
import { DispatchType, Model, Slot, EventType } from "../../../types";
import { selectedDayMsg } from "../Update";
import { AddSlotView } from "./";
import {
  dayClass,
  monthClass,
  monthDayClass,
  currentDayClass,
  prevLastDayClass,
  dayContainerClass,
  eventClass,
} from "../../../styles/styles.css";

function dayContainer(...props: any[]) {
  return h("div", { className: dayContainerClass }, ...props);
}

function slotView(dispatch: DispatchType, slot: Slot) {
  const { title, id } = slot;

  return h("div", {}, title);
}

function slotRow(dispatch: DispatchType, slot: Slot) {
  return h("div", {}, slotView(dispatch, slot));
}

function slotsView(dispatch: DispatchType, slots: Slot[]) {
  const rows = R.map(R.partial(slotRow, [dispatch]), [...slots]);

  return h("div", {}, ...rows);
}

function eventView(dispatch: DispatchType, event: EventType) {
  if (!event.slots) {
    return h("div", { className: eventClass }, "add new slot");
  }

  return h("div", { className: eventClass }, slotsView(dispatch, event.slots));
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
            "data-day": `${i}`,
          },
          `${i}`
        ),
        AddSlotView(dispatch, model)
      );

      daysArray.push(view);
    } else {
      const eventSlots = findSlots?.filter(
        (event) =>
          event.date.toLocaleDateString() ===
          selectedDate(i).toLocaleDateString()
      );
      const slots = eventSlots?.find((e) => e.slots);

      const view = dayContainer(
        h(
          "div",
          {
            className: `${dayClass} ${monthDayClass}`,
            "data-day": `${i}`,
          },
          ...[`${i}`, slots ? eventView(dispatch, slots) : ""]
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
