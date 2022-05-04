import { ICalendar } from "../interfaces/calendar";
import {
  getCurrentYear,
  getCurrentMonthName,
  getMonthDetails,
} from "../helpers/dates";
import { guid } from "../helpers/random";
import { h, render } from "../core/vdom";
import { template as compiler } from "./compilers";
import { html as hbs } from "./compilers";
import initModel from "./calendar/Model";
import update from "./calendar/Update";
import view from "./calendar/View";
import app from "../core/calendar/App";

export class Calendar {
  private selector: HTMLElement;

  constructor(options: ICalendar) {
    const { selector } = options;
    this.selector = selector;
    // this.open();
    this.show();
  }

  public open() {
    if (!this.selector) {
      throw new Error("Please select provide a selecor");
    }

    this.selector.onfocus = (e) => {
      e.preventDefault();
      this.show();
    };
  }

  private show() {
    this.buildCal();
  }

  private buildCal() {
    // const todayDate = `${getCurrentMonthName} ${getCurrentYear}`;
    // const header = this.renderDayOfweek();
    // const month = this.renderMonth(new Date());
    // const containerNode = h(
    //   "div",
    //   {
    //     "data-breakpicker-id": `${guid()}`,
    //     "data-breakpicker-open": `${this.isOpen ? "true" : "false"}`,
    //   },
    //   h(
    //     "div",
    //     { "data-breakpicker-type": "container" },
    //     h("div", { "data-calendar-type": "head" }, `${todayDate}`),
    //     h("div", { "data-calendar-type": "body" }, header)
    //   )
    // );

    // const renderedView = render(containerNode);
    // console.log(renderedView);
    const body = document.getElementsByTagName("body")[0];
    app(initModel, update, view, body);
  }

  private renderDayOfweek() {
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

  private renderMonth(date: Date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthDetails = getMonthDetails(month, year);

    return monthDetails;
    // debugger;
  }
}
