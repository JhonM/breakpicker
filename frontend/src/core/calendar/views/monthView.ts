import { h } from "@jhonm/blanc-vdom";
import { DispatchType, Model, EventType } from "../../../types";
import { EventView } from "./events";
import {
  dayClass,
  monthClass,
  monthDayClass,
  currentDayClass,
  prevLastDayClass,
  dayContainerClass,
} from "../../../styles/styles.css";
import { currentSlotIdMsg } from "../update/updateCurrentSlotId";
import { CurrentDayView, DayContainerView } from ".";

const getEventSlots =
  (slots: EventType[]) =>
  (selectedDate: (date: number) => Date) =>
  (day: number) =>
    slots
      .filter(
        (event) =>
          event.date.toLocaleDateString() ===
          selectedDate(day).toLocaleDateString()
      )
      ?.find((e) => e.slots);

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

  const eventsSlots = getEventSlots(findSlots || []);
  const slots = eventsSlots(selectedDate);

  let x = day;
  while (x > 0) {
    const view = DayContainerView(
      dayContainerClass,
      dispatch,
      prevDays - x + 1,
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
  while (i <= lastDate) {
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      const view = DayContainerView(
        dayContainerClass,
        dispatch,
        i,
        h(
          "div",
          {
            className: `${dayClass} ${currentDayClass}`,
            "data-type-day": "current",
          },

          ...[CurrentDayView(i)]
        )
      );

      daysArray.push(view);
    } else {
      const slotId = findSlots?.find(
        (slot) =>
          slot.date.toLocaleDateString() ===
          selectedDate(i).toLocaleDateString()
      );

      const view = DayContainerView(
        dayContainerClass,
        dispatch,
        i,
        h(
          "div",
          {
            className: `${dayClass} ${monthDayClass}`,
            "data-day": `${i}`,
            "data-type-day": "include-event",
            onclick: () => dispatch(currentSlotIdMsg(slotId?.id || null)),
          },
          ...[`${i}`, EventView(dispatch, model, slots(i))]
        )
      );

      daysArray.push(view);
    }
    i++;
  }

  let j = 1;
  while (j < nextDays) {
    const view = DayContainerView(
      dayContainerClass,
      dispatch,
      j,
      h(
        "div",
        {
          className: dayClass,
          onclick: () => console.log("clicked day view else"),
          "data-day": `${j}`,
          "data-type-day": "inactive",
        },
        `${j}`
      )
    );

    daysArray.push(view);
    j++;
  }

  return h("div", { className: monthClass }, ...daysArray);
}
