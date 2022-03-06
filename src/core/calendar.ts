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
    const header = this.renderDayOfweek();
    console.log(render(header));

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
    // const renderHeader = render(createHeader);
    const toArr = days.reduce((acc: any, curr) => {
      const day = h(
        "div",
        { "data-breakpicker-day": `${curr.d}` },
        `${curr.d}`
      );
      // const rend = render(day);

      if (Array.isArray(acc)) {
        // acc.push(rend);
        acc.push(h);
      }

      return acc;
    }, []);

    // toArr.map((elm: any) => renderHeader.appendChild(elm));

    const toObject = Object.assign({}, toArr);
    const toPropsCommaSep = Object.keys(toObject).forEach((e) => toObject[e]);
    console.log(toPropsCommaSep);
    const createHeader = h("div", { className: "some-classname" }, toObject);
    return createHeader;
  }
}
