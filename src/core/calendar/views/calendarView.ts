import { h } from "../../../core/vdom";
import { guid } from "../../../helpers/random";
import { getCurrentYear, getCurrentMonthName } from "../../../helpers/dates";
import { isOpenMsg, isCloseMsg } from "../Update";
import { DispatchType, Model } from "../../../types";

function daysOfWeekView() {
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

export function calendarView(dispatch: DispatchType, model: Model) {
  // TODO: make sure to keep state of an unique id in the model
  const sc = document.querySelector(".selector-container") as HTMLElement;
  const btn = document.querySelector(
    `[data-trigger-id="${sc.dataset.triggerContent}"]`
  ) as HTMLInputElement;

  if (btn) {
    btn.onfocus = () => dispatch(isOpenMsg(true));
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
        h("div", { "data-calendar-type": "body" }, daysOfWeekView())
      )
    );
  }

  return h("div", {}, "");
}
