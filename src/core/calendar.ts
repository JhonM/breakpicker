import { h, render } from "@jhonm/blanc-vdom";
import { ICalendar } from "../interfaces/calendar";
import { guid } from "../helpers/random";
import initModel from "./calendar/Model";
import update from "./calendar/Update";
import view from "./calendar/View";
import app from "../core/calendar/App";
import {
  prefixedWeekView,
  prefixedMonthView,
  prefixedDay,
  prefixedPrevLastDay,
  prefixedMonthDay,
  prefixedCurrentDay,
} from "../utilities/prefixed_names";

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
    const style = document.createElement("style");

    style.innerHTML = `
      .${prefixedWeekView}, .${prefixedMonthView} {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
      }

      .${prefixedPrevLastDay} {
        opacity: 0.4;
      }

      .${prefixedDay} {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        color: purlple;
        cursor: pointer;
      }

      .${prefixedDay}:first-child {
        grid-column: 7;
      }

      .${prefixedMonthDay} {
        color: red;
      }

      .${prefixedCurrentDay} {
        padding: 2px;
        border-radius: 50%;
        background-color: black;
        color: white;
      }
    `;

    const ref = document.querySelector("script");
    ref?.parentNode?.insertBefore(style, ref);
  }
}
