import { ICalendar } from "../interfaces/calendar";
import { getMonthDetails } from "../helpers/dates";
import { guid } from "../helpers/random";
import { h, render } from "../core/vdom";
import initModel from "./calendar/Model";
import update from "./calendar/Update";
import view from "./calendar/View";
import app from "../core/calendar/App";

export class Calendar {
  private selector: HTMLElement;

  constructor(options: ICalendar) {
    const { selector } = options;
    this.selector = selector;
    this.init();
  }

  private init() {
    if (!this.selector) {
      throw new Error("Please select provide a selecor");
    }

    const CalID = `trigger-${guid()}`;
    const selector = this.selector;
    selector.dataset.triggerId = CalID;

    const createSelector = h("div", {
      className: "selector-container",
      "data-trigger-content": CalID,
    });
    const selectorContainer = render(createSelector);

    selector.parentNode?.insertBefore(selectorContainer, selector);

    app(initModel, update, view, selectorContainer);
  }

  private renderMonth(date: Date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthDetails = getMonthDetails(month, year);

    return monthDetails;
  }
}
