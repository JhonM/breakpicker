import { h, render } from "@jhonm/blanc-vdom";
import { Options } from "../types";
import { guid } from "../helpers/random";
import initModel from "./calendar/Model";
import update from "./calendar/Update";
import view from "./calendar/View";
import app from "../core/calendar/App";

export class Calendar {
  private options: Options;

  constructor(options: Options) {
    this.options = options;
    this.init();
  }

  private init() {
    if (!this.options.selector) {
      throw new Error(
        "Please provide a (valid) selector the current selector is: " +
          this.options.selector
      );
    }

    const id = this.id();
    const CalID = `trigger-${id}`;
    const selector = this.options.selector;
    selector.dataset.triggerId = CalID;

    const createSelector = h("div", {
      className: `selector-container-${id}`,
      "data-trigger-content": CalID,
    });
    const selectorContainer = render(createSelector);

    selector.parentNode?.insertBefore(selectorContainer, selector);

    app(initModel, update, view, selectorContainer, this.options);
  }

  private id() {
    return guid();
  }
}
