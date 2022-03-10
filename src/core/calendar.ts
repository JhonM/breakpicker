import { ICalendar } from "../interfaces/calendar";
import { getCurrentYear, getCurrentMonthName } from "../helpers/dates";
import { guid } from "../helpers/random";
import { h, render } from "../core/vdom";
import { template as compiler } from "./compilers";
import { html as hbs } from "./compilers";

export class Calendar {
  private selector: HTMLElement;
  private isOpen: boolean;

  constructor(options: ICalendar) {
    const { selector } = options;
    this.selector = selector;
    this.isOpen = false;
    this.open();
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
    this.isOpen = true;
    this.buildCal();
  }

  private buildCal() {
    const todayDate = `${getCurrentMonthName} ${getCurrentYear}`;
    const header = this.renderDayOfweek();
    const containerNode = h(
      "div",
      {
        "data-breakpicker-id": `${guid()}`,
        "data-breakpicker-open": `${this.isOpen ? "true" : "false"}`,
      },
      h(
        "div",
        { "data-breakpicker-type": "container" },
        h("div", { "data-calendar-type": "head" }, `${todayDate}`),
        h("div", { "data-calendar-type": "body" }, header)
      )
    );

    const renderedView = render(containerNode);
    document.body.append(renderedView);
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
        { "data-breakpicker-day": `${curr.d}` },
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
}
