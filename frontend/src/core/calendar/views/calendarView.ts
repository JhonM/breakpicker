import { h } from "@jhonm/blanc-vdom";
import { guid } from "../../../helpers/random";
import { DispatchType, Model, Months } from "../../../types";
import { DaysOfWeekView, MonthView, SelectView } from "../views";
import {
  calendarClass,
  calendarFooterClass,
  containerClass,
} from "../../../styles/styles.css";
import { prevMonthMsg } from "../update/updatePrevMonth";
import { nextMonthMsg } from "../update/updateNextMonth";
import { goToTodayMsg } from "../update/updateGoToToday";

function prevMonthButton(dispatch: DispatchType) {
  return h(
    "button",
    { onclick: () => dispatch(prevMonthMsg(1)) },
    "Prev Month"
  );
}

function nextMonthButton(dispatch: DispatchType) {
  return h(
    "button",
    { onclick: () => dispatch(nextMonthMsg(1)) },
    "Next Month"
  );
}

function goToTodayButton(dispatch: DispatchType) {
  return h("button", { onclick: () => dispatch(goToTodayMsg()) }, "Today");
}

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
        ...[
          `${todayDate}`,
          SelectView(dispatch, model),
          prevMonthButton(dispatch),
          nextMonthButton(dispatch),
          goToTodayButton(dispatch),
        ]
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
