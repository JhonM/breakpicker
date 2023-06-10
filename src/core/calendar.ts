import { h, render } from "@jhonm/blanc-vdom";
import { ICalendar } from "../interfaces/calendar";
import { guid } from "../helpers/random";
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
      throw new Error(
        "Please provide a (valid) selector the current selector is: " +
          this.selector
      );
    }

    const id = this.id();
    const CalID = `trigger-${id}`;
    const selector = this.selector;
    selector.dataset.triggerId = CalID;

    const createSelector = h("div", {
      className: `selector-container-${id}`,
      "data-trigger-content": CalID,
    });
    const selectorContainer = render(createSelector);

    selector.parentNode?.insertBefore(selectorContainer, selector);

    app(initModel, update, view, selectorContainer, this.selector);
  }

  private id() {
    return guid();
  }
}
