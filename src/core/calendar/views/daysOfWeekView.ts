import { h } from "../../../core/vdom";

export function daysOfWeekView() {
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
    { className: "week-view", "data-calendar-type": "body-header" },
    ...toArr
  );

  return createHeader;
}
