import { h } from "@jhonm/blanc-vdom";
import { guid } from "../../../helpers/random";
import { getYear, getMonthName } from "../../../helpers/dates";
import { isOpenMsg, isCloseMsg } from "../Update";
import { DispatchType, Model, Options } from "../../../types";
import { DaysOfWeekView, MonthView, SelectView } from "../views";

export function calendarView(
  dispatch: DispatchType,
  model: Model,
  options: Options
) {
  if (options.selector) {
    options.selector.onfocus = () => dispatch(isOpenMsg(true));
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
          { "data-calendar-type": "foot" },
          MonthView(dispatch, model, options.selector)
        )
      )
    );
  }

  return h("div", {}, "");
}
