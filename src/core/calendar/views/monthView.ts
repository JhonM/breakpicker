import { h } from "@jhonm/blanc-vdom";
import {
  DispatchType,
  Model,
  HTMLElementEvent,
  EventType,
} from "../../../types";
import { activeDayMsg, showAddFormMsg } from "../Update";
import { EventView } from "./events";
import {
  dayClass,
  monthClass,
  monthDayClass,
  currentDayClass,
  prevLastDayClass,
  dayContainerClass,
} from "../../../styles/styles.css";
import { guid } from "../../../helpers/random";

function dayContainer(
  dayClass: string,
  dispatch: DispatchType,
  dataDay: string | number,
  ...props: any[]
) {
  return h(
    "div",
    {
      className: dayClass,
      "data-day-id": guid(),
      "data-day": dataDay,

      onclick: (e: HTMLElementEvent<HTMLDivElement>) => {
        dispatch?.(showAddFormMsg(true));
        dispatch?.(activeDayMsg(Number(e.target.dataset.day)));
      },
    },
    ...props
  );
}

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
  const currentDay = (i: number) =>
    h(
      "div",
      {
        className: `${dayClass} ${currentDayClass}`,
        "data-day": `${i}`,
      },
      `${i}`
    );

  let x = day;
  while (x > 0) {
    const view = dayContainer(
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
  while (i < lastDate) {
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      const view = dayContainer(
        dayContainerClass,
        dispatch,
        i,
        h(
          "div",
          {
            className: `${dayClass} ${currentDayClass}`,
            "data-type-day": "current",
          },

          ...[currentDay(i)]
        )
      );

      daysArray.push(view);
    } else {
      const view = dayContainer(
        dayContainerClass,
        dispatch,
        i,
        h(
          "div",
          {
            className: `${dayClass} ${monthDayClass}`,
            "data-day": `${i}`,
            "data-type-day": "include-event",
          },
          ...[`${i}`, EventView(dispatch, slots(i))]
        )
      );

      daysArray.push(view);
    }
    i++;
  }

  let j = 1;
  while (j < nextDays) {
    const view = dayContainer(
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
