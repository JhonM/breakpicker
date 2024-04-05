import { h } from "@jhonm/blanc-vdom";
import { currentDayClass, dayClass } from "../../../styles/styles.css";

export const currentDayView = (i: number) =>
  h(
    "div",
    {
      className: `${dayClass} ${currentDayClass}`,
      "data-day": `${i}`,
    },
    `${i}`
  );
