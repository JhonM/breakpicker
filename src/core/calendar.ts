import { h, render } from "@jhonm/blanc-vdom";
import { ICalendar } from "../interfaces/calendar";
import { guid } from "../helpers/random";
import initModel from "./calendar/Model";
import update from "./calendar/Update";
import view from "./calendar/View";
import app from "../core/calendar/App";
import { prefixedNames } from "../helpers/prefix_builder";

export class Calendar {
  private selector: HTMLElement;

  constructor(options: ICalendar) {
    const { selector } = options;
    this.selector = selector;
    this.style();
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

  private style() {
    // Create our stylesheet
    var style = document.createElement("style");
    style.innerHTML = `
      .${prefixedNames("week-view")}, .${prefixedNames("month-view")} {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
      }

      .${prefixedNames("prev-last-day")} {
        opacity: 0.4;
      }

      .${prefixedNames("day")} {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        color: purlple;
        cursor: pointer;
      }

      .${prefixedNames("day")}:first-child {
        grid-column: 7;
      }

      .${prefixedNames("month-day")} {
        color: red;
      }

      .${prefixedNames("current-day")} {
        padding: 2px;
        border-radius: 50%;
        background-color: black;
        color: white;
      }
    `;

    // Get the first script tag
    var ref = document.querySelector("script");

    // Insert our new styles before the first script tag
    ref?.parentNode?.insertBefore(style, ref);
  }
}
