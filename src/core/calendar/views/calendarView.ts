import { h } from "../../../core/vdom";
import { guid } from "../../../helpers/random";
import { getYear, getMonthName } from "../../../helpers/dates";
import { isOpenMsg, isCloseMsg } from "../Update";
import { DispatchType, Model } from "../../../types";
import { DaysOfWeekView, MonthView, SelectView } from "../views";

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
  }

  return h("div", {}, "");
}
