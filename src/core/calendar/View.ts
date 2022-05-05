import { guid } from "../../helpers/random";
import { getCurrentYear, getCurrentMonthName } from "../../helpers/dates";
import { h } from "../../core/vdom";
import type { Model, ActionType } from "../../types";
import { isOpenMsg, isCloseMsg } from "./Update";

type DispatchType = (action: ActionType) => void;

function daysOfWeek() {
  const days = [
    { d: "Su" },
    { d: "Mo" },
    { d: "Tu" },
    { d: "We" },
    { d: "Th" },
    { d: "Fr" },
    { d: "Sa" },
  ];
  const toArr = days.reduce((acc: any, curr) => {
    const day = h(
      "div",
      { "data-breakpicker-day": `${curr.d}`, role: "breakpicker-week-day" },
      `${curr.d}`
    );

    if (Array.isArray(acc)) {
      acc.push(day);
    }

    return acc;
  }, []);
  const createHeader = h(
    "div",
    { "data-calendar-type": "body-header" },
    ...toArr
  );

  return createHeader;
}

function calendarView(dispatch: DispatchType, model: Model) {
  // TODO: make sure to keep state of an unique id in the model
  const sc = document.querySelector(".selector-container") as HTMLElement;
  const btn = document.querySelector(
    `[data-trigger-id="${sc.dataset.triggerContent}"]`
  ) as HTMLInputElement;

  btn.onfocus = () => dispatch(isOpenMsg(true));

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
        h("div", { "data-calendar-type": "body" }, daysOfWeek())
      )
    );
  }

  return h("div", {}, "");
}

export default function view(dispatch: DispatchType, model: Model) {
  return h(
    "div",
    {},
    ...[
      calendarView(dispatch, model),
      h("pre", {}, JSON.stringify(model, null, 2)),
    ]
  );
  //     h("div", { className: "some-pname" }, model.currentDate.toString()),
}
