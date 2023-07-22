import { h } from "@jhonm/blanc-vdom";
import { guid } from "../../../helpers/random";
import { getYear, getMonthName } from "../../../helpers/dates";
import { DispatchType, Model } from "../../../types";
import { DaysOfWeekView, MonthView, SelectView } from "../views";

export function calendarView(dispatch: DispatchType, model: Model) {
  const todayDate = `${getMonthName(model.currentDate)} ${getYear(
    model.currentDate
  )}`;
  return h(
    "div",
    {
      "data-breakpicker-id": `${guid()}`,
    },
    h(
      "div",
      { "data-breakpicker-type": "container" },
      h(
        "div",
        {
          "data-calendar-type": "head",
        },
        ...[`${todayDate}`, SelectView(dispatch, model)]
      ),
      h("div", { "data-calendar-type": "body" }, DaysOfWeekView()),
      h("div", { "data-calendar-type": "foot" }, MonthView(dispatch, model))
    )
  );

  return h("div", {}, "");
}
