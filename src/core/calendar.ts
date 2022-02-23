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
    const containerNode = h(
      "div",
      {
        "data-breakpicker-id": `${guid()}`,
        "data-breakpicker-open": `${this.isOpen ? "true" : "false"}`,
      },
      h(
        "div",
        { "data-breakpicker-type": "container" },
        h("div", { "data-calendar-type": "head" }, `${todayDate}`)
      )
    );

    const renderedView = render(containerNode);

    document.body.append(renderedView);
  }

  private renderHeader() {
    const days = [
      { m: "Mon" },
      { t: "Tue" },
      { w: "Wed" },
      { t: "Thr" },
      { f: "Fri" },
      { s: "Sat" },
      { s: "Sun" },
    ];
  }
}
