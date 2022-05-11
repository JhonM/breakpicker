import { h } from "../../../core/vdom";
import { guid } from "../../../helpers/random";
import { getCurrentYear, getCurrentMonthName } from "../../../helpers/dates";
import { isOpenMsg, isCloseMsg } from "../Update";
import { DispatchType, Model } from "../../../types";
import { DaysOfWeekView } from "../views";

function monthView(dispatch: DispatchType, model: Model) {
  return h("div", { className: "month-view" }, "Hello");
}

export function calendarView(
  dispatch: DispatchType,
  model: Model,
  selector: HTMLElement
) {
  if (selector) {
    selector.onfocus = () => dispatch(isOpenMsg(true));
  }

  if (model.isOpen) {
    const todayDate = `${getCurrentMonthName} ${getCurrentYear}`;
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
        h("div", { "data-calendar-type": "head" }, `${todayDate}`),
        h("div", { "data-calendar-type": "body" }, DaysOfWeekView()),
        h("div", { "data-calendar-type": "foot" }, monthView(dispatch, model))
      )
    );
  }

  return h("div", {}, "");
}
