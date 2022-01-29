import { ICalendar } from "../interfaces/calendar";
import { getCurrentYear, getCurrentMonthName } from "../helpers/dates";
import { compose } from "../helpers/compose-helpers";

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
    const container = document.createElement("div");
    const todayDate = `${getCurrentMonthName} ${getCurrentYear}`;
    const template = `
      <div>
        <div data-calendar-type="head">
          ${todayDate}
        </div>
      </div>
    `;
    container.innerHTML = template;
    document.body.append(container);
  }
}
