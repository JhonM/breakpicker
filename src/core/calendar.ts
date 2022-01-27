import { ICalendar } from "../interfaces/calendar";

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
    container.innerHTML = "Calendar container";
    document.body.append(container);
  }
}
