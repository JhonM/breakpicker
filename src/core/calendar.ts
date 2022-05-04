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
    const body = document.getElementsByTagName("body")[0];
    const selector = this.selector;
    app(initModel, update, view, body);

    // const month = this.renderMonth(new Date());
  }

  private renderMonth(date: Date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthDetails = getMonthDetails(month, year);

    return monthDetails;
    // debugger;
  }
}
