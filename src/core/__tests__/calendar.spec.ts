/**
 * @jest-environment jsdom
 */
import { screen } from "@testing-library/dom";
import fireEvent from "@testing-library/user-event";
import { getCurrentMonthName, getCurrentYear } from "../../helpers/dates";
import { Calendar } from "../calendar";

beforeEach(() => {
  const input = document.createElement("input");
  input.id = "input";
  input.dataset.testid = "input";
  document.body.appendChild(input);
});

afterEach(() => {
  const input = document.getElementById("input") as HTMLElement;
  const calendars = document.querySelectorAll("div");
  calendars.forEach((cal) => {
    if (cal) {
      const className = cal.className;
      if (className.includes("selector-container")) {
        cal.remove();
      }
    }
  });
  document.body.removeChild(input);
});

test("it renders with an unique id", () => {
  const input = screen.getByTestId("input");
  const optionsInput = {
    selector: input,
  };
  new Calendar({ ...optionsInput });

  fireEvent.click(input);

  const container = document.querySelector(
    '[data-breakpicker-type="container"]'
  );
  expect(
    container?.parentElement?.getAttribute("data-breakpicker-id")
  ).toBeTruthy();
});

test("it renders with a selection option", () => {
  const input = screen.getByTestId("input");
  const options = {
    selector: input,
    isOpen: false,
  };
  const BP = new Calendar({ ...options });

  expect(BP).toMatchObject(options.selector);
});

test("it opens the picker", async () => {
  const input = screen.getByTestId("input");
  const options = {
    selector: input,
  };
  const todayDate = `${getCurrentMonthName} ${getCurrentYear}`;

  new Calendar({ ...options });

  input.focus();

  expect(screen.getByText(todayDate)).toBeTruthy();
});

test("it shows the days of the week", () => {
  const input = screen.getByTestId("input");
  const options = {
    selector: input,
  };
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  new Calendar({ ...options });
  fireEvent.click(input);

  const renderedDays = screen.getAllByRole("breakpicker-week-day");

  expect(renderedDays.length).toEqual(days.length);
  expect(renderedDays.map((day) => day.textContent)).toEqual([
    "Su",
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
  ]);
});

test.skip("it renders the days of passed in month", () => {
  const input = screen.getByTestId("input");
  const options = {
    selector: input,
  };

  new Calendar({ ...options });
  fireEvent.click(input);

  const renderedMonthDays = screen.getAllByRole("breakpicker-day");

  expect(renderedMonthDays.map((day) => day.textContent)).toEqual([
    "1",
    "2",
    "3",
  ]);
});
