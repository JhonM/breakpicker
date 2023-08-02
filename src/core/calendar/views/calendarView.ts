import { h } from "@jhonm/blanc-vdom";
import { guid } from "../../../helpers/random";
import { getYear, getMonthName } from "../../../helpers/dates";
import { DispatchType, Model, Months } from "../../../types";
import { DaysOfWeekView, MonthView, SelectView } from "../views";
import {
  calendarClass,
  calendarFooterClass,
  containerClass,
} from "../../../styles/styles.css";

export function calendarView(dispatch: DispatchType, model: Model) {
  const todayDate = `${Months[model.month]} ${model.year}`;

  return h(
    "div",
    {
      className: calendarClass,
      "data-breakpicker-id": `${guid()}`,
    },
    h(
      "div",
      {
        className: containerClass,
        "data-breakpicker-type": "container",
      },
      h(
        "div",
        {
          "data-calendar-type": "head",
        },
        ...[`${todayDate}`, SelectView(dispatch, model)]
      ),
      h("div", { "data-calendar-type": "body" }, DaysOfWeekView()),
      h(
        "div",
        { className: calendarFooterClass, "data-calendar-type": "foot" },
        MonthView(dispatch, model)
      )
    )
  );
}
